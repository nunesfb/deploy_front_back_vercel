import serverless from "serverless-http";
import app from "./src/app";

export const config = { maxDuration: 60 };
const handler = serverless(app);
export default handler;
