import Activities from '../models/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllActivitiesService {
  private activitieRepository: IActivitiesRepository;

  constructor(activitieRepository: IActivitiesRepository) {
    this.activitieRepository = activitieRepository;
  }
  public async execute(): Promise<Activities[]> {
    const activities = await this.activitieRepository.findAll();

    return activities;
  }
}
