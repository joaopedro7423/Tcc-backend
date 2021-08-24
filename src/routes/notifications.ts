import { Router } from 'express';
import { authenticate } from '../middleware/auth';

import NotificationController from '../controller/NotificationController';
import { authRole } from '../middleware/authRole';

const notificationRoutes = Router();

const notificationController = new NotificationController();

notificationRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

notificationRoutes.get('/', notificationController.index); // listar todos os usuarios

//notificationRoutes.get("/", authenticate, NotificationController.index); // assim se autentica individualmente

notificationRoutes.use(authRole(['professor', 'adm']));

notificationRoutes.post('/', notificationController.create);

//notificationRoutes.get("/pagineted", NotificationController.paginated); //listar os usuários por 10 em 10

//notificationRoutes.get("/search", NotificationController.search);

notificationRoutes.put('/:id', notificationController.update);

notificationRoutes.delete('/:id', notificationController.destroy);

export default notificationRoutes;
