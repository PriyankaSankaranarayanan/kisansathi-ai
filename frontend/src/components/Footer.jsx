import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-farm-100 bg-farm-800 text-farm-100 dark:border-gray-700 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold text-white">KisanSathi AI</p>
            <p className="mt-1 text-sm text-farm-200">
              Empowering farmers with smart technology
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            <Link to="/dashboard" className="hover:text-white">
              Dashboard
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-farm-300">
          © {new Date().getFullYear()} KisanSathi AI — Hackathon MVP
        </p>
      </div>
    </footer>
  );
}
