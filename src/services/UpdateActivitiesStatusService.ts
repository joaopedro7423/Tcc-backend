import Activities from '../models/Activities';
import AppError from '../errors/AppError';

import ActivitiesStatus from '../enums/ActivitiesStatus';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface IRequest {
  id: string;
  status: ActivitiesStatus;
}

export default class UpdateActivitiesStatusService {
  private activitieRepository: IActivitiesRepository;

  constructor(activitieRepository: IActivitiesRepository) {
    this.activitieRepository = activitieRepository;
  }

  public async execute({ id, status }: IRequest): Promise<Activities> {
    const activitie = await this.activitieRepository.findById(id);


    if (!activitie) {
      throw new AppError('Atividade não encontrada!', 400);
    }
    

    if(!Object.values(ActivitiesStatus).includes(status.toUpperCase().trim() as ActivitiesStatus)){
        throw new AppError('Status invalido!', 400);
    }

    activitie.status = status;

    await this.activitieRepository.save(activitie);

    return activitie;
  }
}
