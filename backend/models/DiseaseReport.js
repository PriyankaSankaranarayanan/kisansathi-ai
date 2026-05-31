import mongoose from 'mongoose';

const diseaseReportSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    disease: { type: String, required: true },
    confidence: { type: String, required: true },
    description: { type: String },
    treatment: { type: String },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('DiseaseReport', diseaseReportSchema);
