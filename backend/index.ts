// backend/index.ts
import serverless from "serverless-http";
import app from "./src/app";
import { connectDatabase } from "./src/config/database";

// Conecta no cold start (cacheado internamente)
connectDatabase();

export const config = { maxDuration: 60 }; // 60s no Pro
const handler = serverless(app);
export default handler;
