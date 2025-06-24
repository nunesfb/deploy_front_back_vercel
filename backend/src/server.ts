import serverless from "serverless-http"; //npm i
import app from "./app";
import { connectDatabase } from "./config/database";

// conecta ao Mongo uma vez por cold start
connectDatabase();

export const handler = serverless(app);
