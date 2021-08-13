import { Router } from 'express';
import CampusController from '../controller/CampusController';
import { authenticate } from '../middleware/auth';
import { onlyProfessor } from '../middleware/authProfessor';

const campusRoutes = Router();

const campusController = new CampusController();

campusRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação


campusRoutes.use(onlyProfessor); 
//campusRoutes.use(onlyProfessor); //para um grupo específico ter acesso a rotas
//campusRoutes.use(); //para um grupo específico ter acesso a rotas

campusRoutes.post('/',onlyProfessor ,campusController.create);

//campusRoutes.get("/", authenticate, campusController.index); // assim se autentica individualmente

campusRoutes.get('/', campusController.index); // listar todos os campus

campusRoutes.put('/:id', campusController.update);

campusRoutes.delete('/:id', campusController.destroy);

export default campusRoutes;
