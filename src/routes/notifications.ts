import { Router } from 'express';
import { authenticate } from '../middleware/auth';

import NotificationController from '../controller/NotificationController';

const notificationRoutes = Router();

const notificationController = new NotificationController();

notificationRoutes.post('/', notificationController.create);

notificationRoutes.use(authenticate); // assim se aplica para quem está abaixo a autentiticação

//notificationRoutes.get("/", authenticate, NotificationController.index); // assim se autentica individualmente

notificationRoutes.get('/', notificationController.index); // listar todos os usuarios

//notificationRoutes.get("/pagineted", NotificationController.paginated); //listar os usuários por 10 em 10

//notificationRoutes.get("/search", NotificationController.search);

notificationRoutes.put('/:id', notificationController.update);

notificationRoutes.delete('/:id', notificationController.destroy);

export default notificationRoutes;
