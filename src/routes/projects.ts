import { Router } from "express";
import ProjectController from "../controller/ProjectsController";
import { authenticate } from "../middleware/auth";

const projectRoutes = Router();

const projectController = new ProjectController();

projectRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

projectRoutes.get("/", projectController.index);

//projectRoutes.get("/", authenticate, projectController.index); // assim se autentica individualmente

projectRoutes.post("/", projectController.create);

export default projectRoutes;
