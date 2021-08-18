import validator from 'validator';

import AppError from "../errors/AppError";

import IUsersRepository from "../repositories/IUsersRepository";
import UsersRepository from "../repositories/UsersRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteUsersService {

    private userRepository: IUsersRepository

    constructor(userRepository: UsersRepository) {
        this.userRepository = userRepository

    }
    public async execute(id: string): Promise<void> {

      if (!validator.isUUID(id)) {
        throw new AppError('Codigo  invalido!', 400);
      }
      
        const userExist = await this.userRepository.findById(id)

        if(!userExist){
            throw new AppError('Usuário não existe', 401)
        }
        await this.userRepository.delete(id)
    }
}