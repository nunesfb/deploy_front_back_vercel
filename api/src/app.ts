// backend/src/app.ts

import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";
import projectRoutes from "./routes/project.routes";
import userProjectRoutes from "./routes/userProject.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/addresses", addressRoutes);
app.use("/projects", projectRoutes);
app.use("/user-projects", userProjectRoutes);

// Middleware genérico de tratamento de erros
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno", details: err.message });
});

export default app;
