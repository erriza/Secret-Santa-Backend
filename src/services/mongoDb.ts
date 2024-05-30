import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { FamilyModel } from '../models/family';
import exampleFamilyData from '../../data/families';

dotenv.config();

const connectMongoDb = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI!;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri);

    console.log('Connected to MongoDB');

    // Check if example family data already exists
    const familiesExist = await FamilyModel.exists({});
    console.log('familiesExist', familiesExist)
    if (!familiesExist) {
      await FamilyModel.insertMany(exampleFamilyData);
      console.log('Example family data inserted');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};

export default connectMongoDb;
