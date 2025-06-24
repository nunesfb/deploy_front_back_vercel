// api/index.ts
import serverless from "serverless-http";
import app from "./src/app";
import { connectDatabase } from "./src/config/database";
connectDatabase();
export const config = { maxDuration: 60, memory: 1024 };
export default serverless(app);
