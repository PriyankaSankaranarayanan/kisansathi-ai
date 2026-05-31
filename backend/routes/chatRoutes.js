import { Router } from 'express';
import { sendMessage, getChatHistory } from '../controllers/chatController.js';

const router = Router();

router.post('/chat', sendMessage);
router.get('/chat/history', getChatHistory);

export default router;
