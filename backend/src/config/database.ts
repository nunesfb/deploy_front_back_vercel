// backend/src/config/database.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}
declare global {
  var _mongooseCache: MongooseCache;
}

const cache =
  global._mongooseCache ||
  (global._mongooseCache = { conn: null, promise: null });

export async function connectDatabase() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose
      .connect(process.env.MONGO_URI!)
      .then((m) => (cache.conn = m));
  }
  return cache.promise;
}
