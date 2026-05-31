export default function RecentChats({ chats, loading }) {
  if (loading) {
    return (
      <div className="card">
        <h3 className="mb-4 font-display text-lg font-semibold">Recent Chat History</h3>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!chats?.length) {
    return (
      <div className="card">
        <h3 className="mb-2 font-display text-lg font-semibold">Recent Chat History</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Ask the farming assistant a question to see history here.
        </p>
      </div>
    );
  }

  return (
    <div className="card max-h-80 overflow-y-auto">
      <h3 className="mb-4 font-display text-lg font-semibold">Recent Chat History</h3>
      <ul className="space-y-4">
        {chats.map((c) => (
          <li key={c._id} className="border-b border-farm-50 pb-3 last:border-0 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
              Q: {c.question}
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {c.answer}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {new Date(c.timestamp).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
