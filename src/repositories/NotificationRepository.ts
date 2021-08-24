import { request } from 'express';
import { getRepository, Repository } from 'typeorm';
import ICreateNotificationDTO from '../dtos/ICreateNotificationDTO';
import Notification from '../models/Notifications';
import INotificationRepository from './INotificationRepository';

export default class NotificationRepository implements INotificationRepository {
  private ormRepository: Repository<Notification>;

  constructor() {
    this.ormRepository = getRepository(Notification);
  }

  //implementações de métodos:
  public async findById(id: string): Promise<Notification | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findAll(): Promise<Notification[]> {
    return this.ormRepository.find();
  }

  public async findByCourse(course: string): Promise<Notification[]> {
    return this.ormRepository
      .createQueryBuilder('not')
      .innerJoinAndSelect('not.user', 'user')
      .where('user.course_id = :id', { id: course })
      .getMany();
  }

  public async create({
    description,
    user_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      description,
      user_id,
    });
    await this.ormRepository.save(notification);
    return notification;
  }

  public async save(notification: Notification): Promise<Notification> {
    return this.ormRepository.save(notification);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
