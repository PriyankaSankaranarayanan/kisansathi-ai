import { useState } from 'react';
import toast from 'react-hot-toast';
import { getWeather } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const CONDITION_ICONS = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️',
  Fog: '🌫️',
  Haze: '🌫️',
};

export default function WeatherAdvisory() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      toast.error('Enter your city or village name');
      return;
    }

    setLoading(true);
    try {
      const { data } = await getWeather(city.trim());
      setWeather(data.data);
      toast.success(`Weather loaded for ${data.data.city}`);
    } catch (err) {
      toast.error(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="mb-6 flex items-center gap-3">
        <span className="text-3xl">🌤️</span>
        <div>
          <h2 className="font-display text-xl font-bold">Weather Advisory</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Plan farm work with local weather insights
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city or village (e.g. Pune, Nashik)"
          className="input-field flex-1"
        />
        <button type="submit" disabled={loading} className="btn-primary shrink-0">
          Get Weather
        </button>
      </form>

      <div className="mt-6 min-h-[160px] rounded-xl bg-sky-50/80 p-5 dark:bg-sky-900/20">
        {loading && <LoadingSpinner label="Fetching weather..." />}

        {!loading && !weather && (
          <p className="text-center text-sm text-gray-500">Enter a location to see weather advisory</p>
        )}

        {!loading && weather && (
          <div>
            {weather.demo && (
              <p className="mb-3 rounded-lg bg-amber-100 px-3 py-2 text-xs text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                Demo mode — add OPENWEATHER_API_KEY in backend .env for live data
              </p>
            )}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-bold">{weather.city}</h3>
                <p className="capitalize text-gray-600 dark:text-gray-400">{weather.description}</p>
              </div>
              <span className="text-5xl">{CONDITION_ICONS[weather.condition] || '🌡️'}</span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-white/80 p-4 dark:bg-gray-800/80">
                <p className="text-xs text-gray-500">Temperature</p>
                <p className="text-2xl font-bold">{weather.temperature}°C</p>
              </div>
              <div className="rounded-xl bg-white/80 p-4 dark:bg-gray-800/80">
                <p className="text-xs text-gray-500">Humidity</p>
                <p className="text-2xl font-bold">{weather.humidity}%</p>
              </div>
              <div className="col-span-2 rounded-xl bg-white/80 p-4 sm:col-span-1 dark:bg-gray-800/80">
                <p className="text-xs text-gray-500">Condition</p>
                <p className="text-lg font-bold">{weather.condition}</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border-l-4 border-sky-500 bg-white/90 p-4 dark:bg-gray-800/90">
              <p className="text-xs font-semibold uppercase text-sky-600">Advisory</p>
              <p className="mt-1 text-sm">{weather.advisory}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
