import serverless from "serverless-http";
import app from "./app";
import { connectDatabase } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

// Inicia a conexão uma vez e compartilha a mesma promise
const dbConnectPromise = connectDatabase();

const lambdaHandler = serverless(app);

export const handler = async (req: any, res: any) => {
  try {
    // aguarda a conexão antes de tratar requests
    await dbConnectPromise;
    // e delega ao Express
    return lambdaHandler(req, res);
  } catch (err: any) {
    console.error("🚨 Fatal error in handler:", err);
    // Se a conexão falhar, devolver um JSON legível
    res.status(500).json({
      message: "Internal server error",
      details: err.message,
    });
  }
};
