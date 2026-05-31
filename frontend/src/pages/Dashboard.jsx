import { useCallback, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import StatCard from '../components/StatCard';
import DiseaseDetection from '../components/DiseaseDetection';
import WeatherAdvisory from '../components/WeatherAdvisory';
import FarmingAssistant from '../components/FarmingAssistant';
import RecentReports from '../components/RecentReports';
import RecentChats from '../components/RecentChats';
import { getChatHistory, getRecentReports, getStats } from '../services/api';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [reports, setReports] = useState([]);
  const [chats, setChats] = useState([]);
  const [loadingSidebar, setLoadingSidebar] = useState(true);

  const refreshSidebar = useCallback(async () => {
    try {
      const [statsRes, reportsRes, chatsRes] = await Promise.all([
        getStats(),
        getRecentReports(5),
        getChatHistory(5),
      ]);
      setStats(statsRes.data.data);
      setReports(reportsRes.data.data);
      setChats(chatsRes.data.data);
    } catch {
      toast.error('Could not load dashboard data. Is the backend running?');
    } finally {
      setLoadingSidebar(false);
    }
  }, []);

  useEffect(() => {
    refreshSidebar();
  }, [refreshSidebar]);

  return (
    <div className="flex min-h-screen flex-col dark:bg-gray-900">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white">
            Farmer Dashboard
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Detect diseases, check weather, and chat with your AI farming assistant
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard icon="🔬" label="Disease Reports" value={stats?.diseaseReports ?? 0} />
          <StatCard icon="💬" label="Chat Messages" value={stats?.chatMessages ?? 0} accent="sky" />
          <StatCard icon="🌾" label="Modules Active" value="3" accent="amber" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <DiseaseDetection onSuccess={refreshSidebar} />
            <WeatherAdvisory />
            <FarmingAssistant onSuccess={refreshSidebar} />
          </div>

          <aside className="space-y-6">
            <RecentReports reports={reports} loading={loadingSidebar} />
            <RecentChats chats={chats} loading={loadingSidebar} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
