import mongoose from 'mongoose';

const chatHistorySchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('ChatHistory', chatHistorySchema);
