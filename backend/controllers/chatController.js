import ChatHistory from '../models/ChatHistory.js';
import { getChatResponseMock } from '../services/mockAI.js';

export const sendMessage = async (req, res, next) => {
  try {
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({ success: false, message: 'Question is required' });
    }

    const answer = getChatResponseMock(question.trim());

    const entry = await ChatHistory.create({
      question: question.trim(),
      answer,
    });

    res.json({
      success: true,
      data: {
        question: entry.question,
        answer: entry.answer,
        timestamp: entry.timestamp,
        id: entry._id,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
    const history = await ChatHistory.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();

    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};
