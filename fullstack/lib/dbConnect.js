import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    })
    .then((mongoose) => {
      console.log("MongoDB connected successfully");
      return mongoose;
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);  // Log connection error
      throw new Error('MongoDB connection failed');
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
