import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export class DbConnection {
  private static instance: DbConnection | null = null;
  private constructor() {}

  public static getInstance(): DbConnection {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection();
    }
    return DbConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      const uri: string =
        process.env.URI_STRING || 'dotenv error at db connect';
      await mongoose.connect(uri);
      console.log('Successfully connected to MongoDB using Mongoose!');
    } catch (error) {
      console.error('An error occurred while connecting to MongoDB:', error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('Successfully disconnected from MongoDB.');
    } catch (error) {
      console.error(
        'An error occurred while disconnecting from MongoDB:',
        error
      );
    }
  }
}
