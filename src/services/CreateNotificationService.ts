import AppError from '../errors/AppError';

import Notification from '../models/Notifications';

import InotificationRepository from '../repositories/InotificationRepository';
import notificationRepository from '../repositories/notificationRepository';

interface Request {
  description: string;
  user_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateNotificationService {
  private notificationRepository: InotificationRepository;

  constructor(notificationRepository: notificationRepository) {
    this.notificationRepository = notificationRepository;
  }
  public async execute({
    description,
    user_id,
  }: Request): Promise<Notification> {
    const Notification = await this.notificationRepository.create({
      description,
      user_id,
    });

    return Notification;
  }
}
