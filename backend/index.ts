// backend/index.ts
import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "./src/app";
import { connectDatabase } from "./src/config/database";

dotenv.config();

// Conecta uma vez no cold start
const dbConnect = connectDatabase();
// Cria o handler Express → Serverless
const lambda = serverless(app);

// **Default export** da função que vai ser chamada
export default async function handler(req: any, res: any) {
  try {
    await dbConnect;
    return lambda(req, res);
  } catch (err: any) {
    console.error("❌ Fatal error in handler:", err);
    res
      .status(500)
      .json({ message: "Internal server error", details: err.message });
  }
}
