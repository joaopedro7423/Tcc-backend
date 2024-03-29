import { Request, Response } from 'express';

import NotificationRepository from '../repositories/NotificationRepository';
import CreateNotificationService from '../services/CreateNotificationService';
import DeleteNotificationService from '../services/DeleteNotificationService';
import UpdatNotificationService from '../services/UpdatNotificationService';

export default class NotificationController {
  //para achar todos os notification listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const { course_id, role, id } = req.user;

    const notificationRepository = new NotificationRepository();

    if (role == 'adm') {
      const notification = await notificationRepository.findAll();

      return res.json(notification);
    }

    if (role == 'professor') {
      const notification = await notificationRepository.findAllByIdProfessor(
        id,
      );

      return res.json(notification);
    }

    const notification = await notificationRepository.findByCourse(course_id);

    return res.json(notification);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const { id } = req.user;
    //console.log(user_id)
    const user_id = id;
    const notificationRepository = new NotificationRepository();
    const createnotification = new CreateNotificationService(
      notificationRepository,
    );

    const notification = await createnotification.execute({
      description,
      user_id,
    });

    return res.status(201).json(notification);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { description } = req.body;

    const notificationRepository = new NotificationRepository();
    const updatenotification = new UpdatNotificationService(
      notificationRepository,
    );

    const notification = await updatenotification.execute({
      id,
      description,
    });

    return res.json(notification);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const notificationRepository = new NotificationRepository();
    const destroyNotification = new DeleteNotificationService(
      notificationRepository,
    );
    await destroyNotification.execute(id);

    return res.status(204).send();
  }
}
