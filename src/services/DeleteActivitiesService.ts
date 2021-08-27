import validator from 'validator';

import AppError from '../errors/AppError';

import IActivitiesRepository from '../repositories/IActivitiesRepository';

export default class DeleteActivitiesService {
  private activitieRepository: IActivitiesRepository;

  constructor(activitieRepository: IActivitiesRepository) {
    this.activitieRepository = activitieRepository;
  }

  public async execute(id: string): Promise<void> {
    if (!validator.isUUID(id)) {
      throw new AppError('Codigo  invalido!', 400);
    }

    const activities = await this.activitieRepository.findById(id);

    if (!activities) {
      throw new AppError('Atividade não existe', 401);
    }

    await this.activitieRepository.delete(id);
  }
}
