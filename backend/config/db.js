import mongoose from 'mongoose';

/**
 * Connect to MongoDB. Exits process on failure so misconfiguration is obvious at startup.
 */
export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kisansathi';
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  console.log('MongoDB connected');
};
