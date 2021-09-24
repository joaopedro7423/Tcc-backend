import validator from 'validator';

import AppError from "../errors/AppError";

import INotificationRepository from "../repositories/INotificationRepository";
import NotificationRepository from "../repositories/NotificationRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteNotificationService {

    private NotificationRepository: INotificationRepository

    constructor(NotificationRepository: NotificationRepository) {
        this.NotificationRepository = NotificationRepository

    }
    public async execute(id: string): Promise<void> {

      
      if (!validator.isUUID(id)) {
        throw new AppError('Codigo  invalido!', 400);
      }
        const userExist = await this.NotificationRepository.findById(id)

        if(!userExist){
            throw new AppError('notification dont exist', 401)
        }
        await this.NotificationRepository.delete(id)
    }
}