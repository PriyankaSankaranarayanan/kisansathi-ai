import { fetchWeather } from '../services/weatherService.js';

export const getWeather = async (req, res, next) => {
  try {
    const city = req.query.city?.trim();

    if (!city) {
      return res.status(400).json({ success: false, message: 'City name is required' });
    }

    const weather = await fetchWeather(city);
    res.json({ success: true, data: weather });
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).json({ success: false, message: 'City not found. Try another spelling.' });
    }
    next(err);
  }
};
