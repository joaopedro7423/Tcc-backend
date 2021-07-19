import { Router } from "express";
import UserController from "../controller/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);

userRoutes.get("/list", userController.index);

export default userRoutes;
