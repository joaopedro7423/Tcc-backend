import AppError from '../errors/AppError';
import  Notifications  from '../models/Notifications';

import INotificationRepository from '../repositories/INotificationRepository';
import NotificationRepository from '../repositories/NotificationRepository';

interface Request {
  id: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdatNotificationService {
  private NotificationRepository: INotificationRepository;

  constructor(NotificationRepository: NotificationRepository) {
    this.NotificationRepository = NotificationRepository;
  }
  public async execute({ id, description }: Request): Promise<Notifications> {
    const notification = await this.NotificationRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!notification) {
      throw new AppError('notification not found!', 400);
    }

    notification.description = description;

    //salva
    await this.NotificationRepository.save(notification);

    return notification;
  }
}
