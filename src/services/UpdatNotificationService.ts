import { hash } from 'bcrypt';
import Notification from '../models/Notifications';
import AppError from '../errors/AppError';

import InotificationRepository from '../repositories/InotificationRepository';
import notificationRepository from '../repositories/notificationRepository';

interface Request {
  id: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdatNotificationService {
  private notificationRepository: InotificationRepository;

  constructor(notificationRepository: notificationRepository) {
    this.notificationRepository = notificationRepository;
  }
  public async execute({ id, description }: Request): Promise<Notification> {
    const notification = await this.notificationRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!notification) {
      throw new AppError('notification not found!', 400);
    }

    notification.description = description;

    //salva
    await this.notificationRepository.save(notification);

    return notification;
  }
}
