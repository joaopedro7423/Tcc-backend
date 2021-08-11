import { Router } from "express";
import StudentController from "../controller/StudentController";
import { authenticate } from "../middleware/auth";

const studentRoutes = Router();

const studentController = new StudentController();

studentRoutes.post("/", studentController.create);

studentRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

//studentRoutes.get("/", authenticate, studentController.index); // assim se autentica individualmente

studentRoutes.get("/", studentController.index); // listar todos os usuarios

studentRoutes.get("/pagineted", studentController.paginated); //listar os usuários por 10 em 10

studentRoutes.get("/search", studentController.search);

studentRoutes.put("/:id", studentController.update);

studentRoutes.delete("/:id", studentController.destroy);

export default studentRoutes;
