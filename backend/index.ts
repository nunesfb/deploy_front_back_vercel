// backend/index.ts
import serverless from "serverless-http";
import app from "./src/app";
import { connectDatabase } from "./src/config/database";

// Inicia a conexão uma vez em cold start
connectDatabase();

export const config = { maxDuration: 60 };
const handler = serverless(app);
export default handler;
