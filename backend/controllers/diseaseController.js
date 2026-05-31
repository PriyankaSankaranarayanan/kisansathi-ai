import DiseaseReport from '../models/DiseaseReport.js';
import ChatHistory from '../models/ChatHistory.js';
import { detectDiseaseMock } from '../services/mockAI.js';

export const detectDisease = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a crop image' });
    }

    const result = detectDiseaseMock(req.file);
    const imageUrl = `/uploads/${req.file.filename}`;

    const report = await DiseaseReport.create({
      imageUrl,
      disease: result.disease,
      confidence: result.confidence,
      description: result.description,
      treatment: result.treatment,
    });

    res.json({
      success: true,
      data: {
        ...result,
        imageUrl,
        reportId: report._id,
        timestamp: report.timestamp,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getRecentReports = async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit, 10) || 5, 20);
    const reports = await DiseaseReport.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .lean();

    res.json({ success: true, data: reports });
  } catch (err) {
    next(err);
  }
};

export const getStats = async (_req, res, next) => {
  try {
    const [reportCount, chatCount] = await Promise.all([
      DiseaseReport.countDocuments(),
      ChatHistory.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        diseaseReports: reportCount,
        chatMessages: chatCount,
      },
    });
  } catch (err) {
    next(err);
  }
};
