import React, { useState } from 'react';
import { marked } from 'marked';
import { askGemini } from '../../api/Geminiaxios';

function isFitnessRelated(text) {
  const fitnessKeywords = [
    'hi','workout', 'exercise', 'fitness', 'gym', 'diet', 'calories',
    'training', 'cardio', 'strength', 'protein', 'fat loss',
    'muscle', 'yoga', 'running', 'HIIT', 'squats', 'reps', 'sets',
    'pushups', 'plank', 'wellness', 'health', 'flexibility', 'stretching',
  ];
  const lower = text.toLowerCase();
  return fitnessKeywords.some(keyword => lower.includes(keyword));
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    const prompt = input.trim();
    // if (!prompt) return;
    setErr('');
    setLoading(true);
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    setInput('');

    // Restrict to fitness-related prompts
    if (!isFitnessRelated(prompt)) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "❌ I'm only trained to help with **fitness-related questions**. Please ask about workouts, diet, exercise, or health.",
        },
      ]);
      setLoading(false);
      return;
    }

    try {
        const refinedprompt= `Answer briefly and directly. Avoid long explanations. ${prompt}`
      const { text } = await askGemini(refinedprompt, { maxOutputTokens: 2048 });
      setMessages((prev) => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      const msg = error?.message || 'Unknown error';
      setErr(msg);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ Error: ${msg}` },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4">
      <div className="mx-auto max-w-3xl flex flex-col gap-4">
        <header className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Fitness Assistant 💪</h1>
        </header>

        {err && (
          <div className="text-red-200 bg-red-500/10 border border-red-500/40 rounded-lg p-3 text-sm">
            {err}
          </div>
        )}

        <main className="bg-slate-800 rounded-2xl p-3 flex-1 flex flex-col gap-3 min-h-[60vh]">
          {messages.length === 0 && !loading && (
            <div className="text-center text-slate-400 py-8">
              Ask me anything about fitness, workouts, or diet to get started 💬
            </div>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-xl px-3 py-2 leading-relaxed ${
                  m.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-100'
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: marked(m.content) }} />
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] bg-slate-700 rounded-xl px-3 py-2 flex items-center">
                <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-slate-400 border-t-transparent inline-block" />
                Thinking…
              </div>
            </div>
          )}
        </main>

        <form onSubmit={onSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about workouts, diet, or fitness goals…"
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="px-4 py-2 bg-blue-600 border border-blue-600 rounded-xl font-medium text-white disabled:opacity-50"
          >
            Send
          </button>
        </form>

        <footer className="text-xs text-slate-500 text-center">
          Powered by Gemini API – Fitness Mode Only 🏋️
        </footer>
      </div>
    </div>
  );
}
