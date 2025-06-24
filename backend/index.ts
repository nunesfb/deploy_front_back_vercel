// api/index.ts
import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "./src/app";
import { connectDatabase } from "./src/config/database";

dotenv.config();
const dbConnectPromise = connectDatabase();

const lambda = serverless(app);

export const handler = async (req: any, res: any) => {
  try {
    await dbConnectPromise;
    return lambda(req, res);
  } catch (err: any) {
    console.error("❌ Fatal error in handler:", err);
    res
      .status(500)
      .json({ message: "Internal server error", details: err.message });
  }
};
