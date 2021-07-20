import { Router } from "express";
import UserController from "../controller/UserController";

const userRoutes = Router();

const userController = new UserController();

userRoutes.get("/", userController.index);

userRoutes.get("/pagineted", userController.paginated);

userRoutes.get("/search", userController.search);

userRoutes.post("/", userController.create);

userRoutes.put("/:id", userController.update);

userRoutes.delete("/:id", userController.destroy);

export default userRoutes;
