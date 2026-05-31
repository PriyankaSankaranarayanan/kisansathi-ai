import axios from 'axios';

const ADVISORIES = {
  Rain: 'Rain expected. Avoid spraying pesticides today. Ensure proper field drainage.',
  Drizzle: 'Light rain possible. Delay fertilizer application until soil dries.',
  Thunderstorm: 'Storm alert! Secure equipment and avoid field work until weather clears.',
  Snow: 'Cold conditions. Protect sensitive crops with mulch or covers.',
  Clear: 'Clear skies — good day for harvesting and field preparation.',
  Clouds: 'Cloudy weather. Moderate conditions for most farming activities.',
  Mist: 'High humidity. Watch for fungal diseases on leaves.',
  Fog: 'Low visibility. Postpone machinery work if possible.',
  Haze: 'Poor air quality. Irrigate lightly to reduce dust on crops.',
};

const getAdvisory = (condition, temp) => {
  const base = ADVISORIES[condition] || 'Monitor local weather and plan field work accordingly.';
  if (temp > 38) return `${base} High temperature alert — irrigate crops in early morning or evening.`;
  if (temp < 10) return `${base} Cold stress possible — protect young seedlings.`;
  return base;
};

/**
 * Fetch weather from OpenWeather. Falls back to demo data when API key is missing.
 */
export const fetchWeather = async (city) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey || apiKey === 'your_openweather_api_key_here') {
    return {
      city,
      temperature: 28,
      humidity: 72,
      condition: 'Clouds',
      description: 'partly cloudy (demo mode — add OPENWEATHER_API_KEY)',
      advisory: 'Rain expected tomorrow. Avoid spraying pesticides today. (Demo advisory)',
      demo: true,
    };
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const { data } = await axios.get(url);
  const condition = data.weather[0].main;
  const temp = Math.round(data.main.temp);

  return {
    city: data.name,
    temperature: temp,
    humidity: data.main.humidity,
    condition,
    description: data.weather[0].description,
    advisory: getAdvisory(condition, temp),
    demo: false,
  };
};
