import { Router } from 'express';
import { getStats } from '../controllers/diseaseController.js';

const router = Router();

router.get('/stats', getStats);

export default router;
