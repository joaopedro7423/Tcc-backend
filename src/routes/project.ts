import { Router } from 'express';
import ProjectsController from '../controller/ProjectsController';
import { authenticate } from '../middleware/auth';
import multer from 'multer';
import multerConfig from '../config/multer';

const projectRoutes = Router();

const projectController = new ProjectsController();

projectRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

projectRoutes.get('/', projectController.index);

//projectRoutes.get("/", authenticate, projectController.index); // assim se autentica individualmente

projectRoutes.post('/', projectController.create); //o multer funciona como middleware | o single serve para passar 1 imagem por vez

//projectRoutes.put("/:id/upload",multer(multerConfig).single("logo"),projectController.uploadLogo); //o multer funciona como middleware | o single serve para passar 1 imagem por vez

projectRoutes.put('/:id', projectController.update);

projectRoutes.get('/:id', projectController.show);

projectRoutes.delete('/:id', projectController.destroy);

//projectRoutes.patch("/:id", projectController.chengeStatus); //patch é recomendado para alterar apenas 1 campo como nesse caso

export default projectRoutes;

/*
single('logo'): 'logo' fild name que vai ser passado no post no react no front carai

*/
