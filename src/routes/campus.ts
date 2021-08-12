import { Router } from 'express';
import CampusController from '../controller/CampusController';
import { authenticate } from '../middleware/auth';

const campusRoutes = Router();

const campusController = new CampusController();

campusRoutes.post('/', campusController.create);

//campusRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

//campusRoutes.get("/", authenticate, campusController.index); // assim se autentica individualmente

campusRoutes.get('/', campusController.index); // listar todos os campus

campusRoutes.put('/:id', campusController.update);

campusRoutes.delete('/:id', campusController.destroy);

export default campusRoutes;
