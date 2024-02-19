
import express, { Router } from "express";
import { eventController } from "../controllers/events";
export const route: Router = express.Router();
route.get("/", eventController.read);
route.post("/", eventController.create);
route.patch("/:id", eventController.update);
route.delete("/:id", eventController.delete);
