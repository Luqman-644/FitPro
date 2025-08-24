import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = "gemini-2.5-flash";

const client = axios.create({
  baseURL: "https://generativelanguage.googleapis.com/v1beta",
  timeout: 30000,
});

export async function askGemini(prompt, options = {}) {
  if (!GEMINI_API_KEY) throw new Error("Missing VITE_GEMINI_API_KEY");

  const { temperature = 0.7, maxOutputTokens = 4096 } = options;

  const url = `/models/${MODEL}:generateContent?key=${encodeURIComponent(
    GEMINI_API_KEY
  )}`;

  const body = {
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { temperature, maxOutputTokens },
  };

  const { data } = await client.post(url, body, {
    headers: { "Content-Type": "application/json" },
  });

  const blocked = data?.promptFeedback?.blockReason;
  if (blocked) throw new Error(`Prompt was blocked: ${blocked}`);

  const parts = data?.candidates?.[0]?.content?.parts || [];
  const text = parts.map((p) => p.text || "").join("").trim();

  if (!text) throw new Error("No text returned from Gemini.");
  return { text, raw: data };
}
