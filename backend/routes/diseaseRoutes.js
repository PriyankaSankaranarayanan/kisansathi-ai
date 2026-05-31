import { Router } from 'express';
import { detectDisease, getRecentReports } from '../controllers/diseaseController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/disease-detect', upload.single('image'), detectDisease);
router.get('/reports', getRecentReports);

export default router;
