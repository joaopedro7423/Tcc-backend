import AppError from '../errors/AppError';

import ICampusRepository from '../repositories/ICampusRepository';
import CampusRepository from '../repositories/CampusRepository';


//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteCampusService {

    private campusRepository: ICampusRepository

    constructor(campusRepository: CampusRepository) {
        this.campusRepository = campusRepository

    }
    public async execute(id: string): Promise<void> {
        const campusExist = await this.campusRepository.findById(id)

        if(!campusExist){
            throw new AppError('Campus não existe', 401)
        }
        await this.campusRepository.delete(id)
    }
}