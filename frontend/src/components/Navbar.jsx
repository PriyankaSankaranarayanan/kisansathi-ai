import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <header className="sticky top-0 z-50 border-b border-farm-100/80 bg-white/90 backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-farm-600 text-xl text-white">
            🌾
          </span>
          <span className="font-display text-xl font-bold text-farm-800 dark:text-farm-300">
            KisanSathi <span className="text-farm-600">AI</span>
          </span>
        </Link>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-600 hover:bg-farm-50 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>

          {!isDashboard && (
            <Link to="/dashboard" className="btn-primary text-sm sm:text-base">
              Open Dashboard
            </Link>
          )}
          {isDashboard && (
            <Link to="/" className="btn-secondary hidden text-sm sm:inline-flex sm:text-base">
              Home
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
