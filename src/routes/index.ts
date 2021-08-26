import { Router } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';
import projectRoutes from './project';
import notificationRoutes from './notifications';
import campusRoutes from './campus';
import coursesRoutes from './courses';
import proposalRoutes from './proposals';
import activitiesRoutes from './activities';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) => {
  return response.json({ message: 'Helo Back-End' });
});

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/notifications`, notificationRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
routes.use(`${prefixRoutes}/projects`, projectRoutes);
routes.use(`${prefixRoutes}/campus`, campusRoutes);
routes.use(`${prefixRoutes}/courses`, coursesRoutes);
routes.use(`${prefixRoutes}/proposals`, proposalRoutes);
routes.use(`${prefixRoutes}/activities`, activitiesRoutes);

export default routes;
