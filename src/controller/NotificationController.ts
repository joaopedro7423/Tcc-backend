import { Request, Response } from 'express';

import NotificationRepository from '../repositories/NotificationRepository';
import CreatenotificationService from '../services/CreatenotificationService';
import DeleteNotificationService from '../services/DeleteNotificationService';
import UpdatNotificationService from '../services/UpdatnotificationService';

export default class NotificationController {
  //para achar todos os notification listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const notificationRepository = new NotificationRepository();

    const notification = await notificationRepository.findAll();

    return res.json(notification);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { description, user_id } = req.body;

    const notificationRepository = new NotificationRepository();
    const createnotification = new CreatenotificationService(
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
    const { description, user_id } = req.body;

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
