import { Router } from "express";
import UserController from "../controller/UserController";
import { authenticate } from "../middleware/auth";

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);

userRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

//userRoutes.get("/", authenticate, userController.index); // assim se autentica individualmente

userRoutes.get("/", userController.index); // listar todos os usuarios

userRoutes.get("/pagineted", userController.paginated); //listar os usuários por 10 em 10

userRoutes.get("/search", userController.search);

userRoutes.put("/:id", userController.update);

userRoutes.delete("/:id", userController.destroy);

export default userRoutes;
