import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { sendChatMessage } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const SUGGESTIONS = [
  'How to increase tomato yield?',
  'Why are rice leaves turning yellow?',
  'Best fertilizer for cotton?',
];

export default function FarmingAssistant({ onSuccess }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const question = text?.trim() || input.trim();
    if (!question) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setLoading(true);

    try {
      const { data } = await sendChatMessage(question);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.data.answer },
      ]);
      onSuccess?.();
    } catch (err) {
      toast.error(err.message);
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex flex-col">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-3xl">🤖</span>
        <div>
          <h2 className="font-display text-xl font-bold">AI Farming Assistant</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ask questions about crops, pests, and practices
          </p>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            disabled={loading}
            className="rounded-full border border-farm-200 bg-farm-50 px-3 py-1 text-xs text-farm-800 transition hover:bg-farm-100 dark:border-farm-700 dark:bg-farm-900/30 dark:text-farm-200"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex h-72 flex-col overflow-hidden rounded-xl border border-farm-100 bg-farm-50/30 dark:border-gray-700 dark:bg-gray-900/30">
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {messages.length === 0 && (
            <p className="text-center text-sm text-gray-500">
              Namaste! I am your farming assistant. Ask me anything.
            </p>
          )}
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${
                  m.role === 'user'
                    ? 'bg-farm-600 text-white'
                    : 'bg-white shadow-sm dark:bg-gray-800'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <LoadingSpinner size="sm" />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
          className="flex gap-2 border-t border-farm-100 p-3 dark:border-gray-700"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your farming question..."
            className="input-field flex-1 py-2"
            disabled={loading}
          />
          <button type="submit" disabled={loading} className="btn-primary px-4 py-2">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
