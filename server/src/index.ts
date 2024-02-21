/** @format */

import express, { Application, Response, Request, NextFunction } from "express";
import { config } from "dotenv";
import { route as userRoutes } from "./routes/user";
import { route as eventRoutes } from "./routes/events";
import { PrismaClient } from "@prisma/client";
import { verifyUser } from "./middlewares/auth-middleware";
import cors from "cors";
config();
const app: Application = express();
const PORT = process.env.PORT || 8000;
export const prisma = new PrismaClient();
export const secretKey = process.env.secretKey;
app.use(express.json());
app.use(cors());
app.use("/users", userRoutes);
app.use("/events", verifyUser, eventRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: error.message,
  });
});

app.listen(PORT, () => {
  console.log("app runs on port", PORT);
});
