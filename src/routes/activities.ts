import { Router } from 'express';
import { authenticate } from '../middleware/auth';

import ActivitiesController from '../controller/ActivitiesController';
import { authRole } from '../middleware/authRole';

const activitiesRoutes = Router();

const activitiesController = new ActivitiesController();

activitiesRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

activitiesRoutes.get('/', activitiesController.index); // listar todos os usuarios

//activitiesRoutes.get("/", authenticate, ActivitiesController.index); // assim se autentica individualmente

//activitiesRoutes.use(authRole(['professor', 'adm']));

//activitiesRoutes.post('/', activitiesController.create);

//activitiesRoutes.get("/pagineted", ActivitiesController.paginated); //listar os usuários por 10 em 10

//activitiesRoutes.get("/search", ActivitiesController.search);

//activitiesRoutes.put('/:id', activitiesController.update);

//activitiesRoutes.delete('/:id', activitiesController.destroy);

export default activitiesRoutes;
