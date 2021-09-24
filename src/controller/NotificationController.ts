import { Request, Response } from 'express';

import NotificationRepository from '../repositories/NotificationRepository';
import CreateNotificationService from '../services/CreateNotificationService';
import DeleteNotificationService from '../services/DeleteNotificationService';
import UpdatNotificationService from '../services/UpdatNotificationService';

export default class NotificationController {
  //para achar todos os notification listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const { course_id, role, id } = req.user;

    const NotificationRepository = new NotificationRepository();

    if (role == 'adm') {
      const notification = await NotificationRepository.findAll();

      return res.json(notification);
    }

    if (role == 'professor') {
      const notification = await NotificationRepository.findAllByIdProfessor(
        id,
      );

      return res.json(notification);
    }

    const notification = await NotificationRepository.findByCourse(course_id);

    return res.json(notification);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { description } = req.body;

    const { id } = req.user;
    //console.log(user_id)
    const user_id = id;
    const NotificationRepository = new NotificationRepository();
    const createnotification = new CreateNotificationService(
      NotificationRepository,
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

    const NotificationRepository = new NotificationRepository();
    const updatenotification = new UpdatNotificationService(
      NotificationRepository,
    );

    const notification = await updatenotification.execute({
      id,
      description,
    });

    return res.json(notification);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const NotificationRepository = new NotificationRepository();
    const destroyNotification = new DeleteNotificationService(
      NotificationRepository,
    );
    await destroyNotification.execute(id);

    return res.status(204).send();
  }
}
