import express, { Router } from "express";
import { userController } from "../controllers/user";
import { verifyUser } from "../middlewares/auth-middlewares";
export const route: Router = express.Router();
route.post("/v1", userController.login); //login
route.post("/v2", userController.register); //register
route.post("/v3", verifyUser, userController.keepLogin); //keep-login
