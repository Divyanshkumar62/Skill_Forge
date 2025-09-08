import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();

// Connect to in-memory database for testing
export const connectDB = async (): Promise<typeof mongoose> => {
  await mongoose.disconnect(); // Disconnect any existing connection
  const mongoUri = await mongoServer.getUri();

  return mongoose.connect(mongoUri);
};

// Close database connection and stop mongo server
export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

// Clear database collections
export const clearDatabase = async (): Promise<void> => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key] as mongoose.Collection;
    await collection.deleteMany({});
  }
};
