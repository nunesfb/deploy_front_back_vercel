// config/database.ts
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // para não reclamar em TS sobre global._mongoose
  var _mongoose: MongooseCache | undefined;
}

export async function connectDatabase() {
  // Se já existe conexão ativa, retorna ela
  if (global._mongoose?.conn) {
    console.log("🟢 MongoDB: usando conexão existente");
    return global._mongoose.conn;
  }

  // Se ainda não inicializamos o cache, faz isso
  if (!global._mongoose) {
    global._mongoose = { conn: null, promise: null };
  }

  // Se ainda não iniciamos a promise de conexão, cria agora
  if (!global._mongoose.promise) {
    const uri = process.env.MONGO_URI!;
    global._mongoose.promise = mongoose
      .connect(uri)
      .then((m) => {
        console.log("🟢 MongoDB: conexão estabelecida");
        return m;
      })
      .catch((err) => {
        console.error("🔴 MongoDB: falha ao conectar", err);
        process.exit(1);
      });
  }

  // Aguarda a promise e guarda a conexão
  global._mongoose.conn = await global._mongoose.promise;
  return global._mongoose.conn;
}
