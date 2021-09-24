import AppError from '../errors/AppError';
import  Notifications  from '../models/Notifications';


import INotificationRepository from '../repositories/INotificationRepository';
import NotificationRepository from '../repositories/NotificationRepository';

interface Request {
  description: string;
  user_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateNotificationService {
  private NotificationRepository: INotificationRepository;

  constructor(NotificationRepository: NotificationRepository) {
    this.NotificationRepository = NotificationRepository;
  }
  public async execute({
    description,
    user_id,
  }: Request): Promise<Notifications> {
    const Notification = await this.NotificationRepository.create({
      description,
      user_id,
    });

    return Notification;
  }
}
