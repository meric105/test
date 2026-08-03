import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb://root:123456@mongodb:27017/mydatabase?authSource=admin',
    );
    console.log('MongoDB Bağlantısı Başarılı!');
  } catch (error) {
    console.error('MongoDB Bağlantı Hatası:', error);
    process.exit(1);
  }
};
