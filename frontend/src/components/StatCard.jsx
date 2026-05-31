export default function StatCard({ icon, label, value, accent = 'farm' }) {
  const accents = {
    farm: 'bg-farm-100 text-farm-700 dark:bg-farm-900/40 dark:text-farm-300',
    sky: 'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    amber: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  };

  return (
    <div className="card flex items-center gap-4">
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${accents[accent]}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-display text-2xl font-bold text-gray-900 dark:text-white">
          {value ?? '—'}
        </p>
      </div>
    </div>
  );
}
