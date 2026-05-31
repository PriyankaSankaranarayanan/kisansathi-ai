import { Router } from 'express';
import { getWeather } from '../controllers/weatherController.js';

const router = Router();

router.get('/weather', getWeather);

export default router;
