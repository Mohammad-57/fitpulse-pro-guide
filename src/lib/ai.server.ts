const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/responses";

export type AiCallResult = { text: string };

/**
 * Calls the Lovable AI Gateway Responses API and streams server-side,
 * accumulating the final text. Streaming is required for reasoning models.
 */
export async function callAiText(
  apiKey: string,
  system: string,
  prompt: string,
): Promise<AiCallResult> {
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "openai/gpt-5.5",
      input: [
        { role: "system", content: system },
        { role: "user", content: prompt },
      ],
      stream: true,
      reasoning: { effort: "low", summary: "auto" },
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    if (res.status === 429) {
      throw new Error("The AI coach is busy right now (rate limit). Please try again in a moment.");
    }
    if (res.status === 402) {
      throw new Error("AI credits are exhausted. Please add credits to continue using the AI features.");
    }
    throw new Error(
      `AI service unavailable (${res.status}). ${detail.slice(0, 200)}`.trim(),
    );
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as {
          type?: string;
          delta?: string;
          response?: { output_text?: string };
        };
        if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
          text += event.delta;
        } else if (
          event.type === "response.completed" &&
          !text &&
          typeof event.response?.output_text === "string"
        ) {
          text = event.response.output_text;
        }
      } catch {
        // ignore malformed SSE chunk
      }
    }
  }

  return { text: text.trim() };
}

/** Extracts a JSON object from model text, tolerating code fences or prose. */
export function extractJson<T>(text: string): T | null {
  const cleaned = text.replace(/```json/gi, "```").trim();
  const fenced = cleaned.match(/```([\s\S]*?)```/);
  const candidates = [fenced?.[1], cleaned].filter(Boolean) as string[];
  for (const candidate of candidates) {
    const start = candidate.indexOf("{");
    const end = candidate.lastIndexOf("}");
    if (start === -1 || end === -1) continue;
    try {
      return JSON.parse(candidate.slice(start, end + 1)) as T;
    } catch {
      // try next candidate
    }
  }
  return null;
}
