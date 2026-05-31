import { imageUrl } from '../services/api';

export default function RecentReports({ reports, loading }) {
  if (loading) {
    return (
      <div className="card">
        <h3 className="mb-4 font-display text-lg font-semibold">Recent Disease Reports</h3>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!reports?.length) {
    return (
      <div className="card">
        <h3 className="mb-2 font-display text-lg font-semibold">Recent Disease Reports</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No reports yet. Upload a crop image to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="mb-4 font-display text-lg font-semibold">Recent Disease Reports</h3>
      <ul className="space-y-3">
        {reports.map((r) => (
          <li
            key={r._id}
            className="flex items-center gap-3 rounded-xl border border-farm-50 p-3 dark:border-gray-700"
          >
            <img
              src={imageUrl(r.imageUrl)}
              alt={r.disease}
              className="h-14 w-14 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-farm-800 dark:text-farm-300">
                {r.disease}
              </p>
              <p className="text-xs text-gray-500">
                {r.confidence} · {new Date(r.timestamp).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
