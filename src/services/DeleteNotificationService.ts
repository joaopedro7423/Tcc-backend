import validator from 'validator';

import AppError from "../errors/AppError";

import InotificationRepository from "../repositories/InotificationRepository";
import notificationRepository from "../repositories/notificationRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteNotificationService {

    private notificationRepository: InotificationRepository

    constructor(notificationRepository: notificationRepository) {
        this.notificationRepository = notificationRepository

    }
    public async execute(id: string): Promise<void> {

      
      if (!validator.isUUID(id)) {
        throw new AppError('Codigo  invalido!', 400);
      }
        const userExist = await this.notificationRepository.findById(id)

        if(!userExist){
            throw new AppError('notification dont exist', 401)
        }
        await this.notificationRepository.delete(id)
    }
}