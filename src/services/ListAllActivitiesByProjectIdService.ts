import Activities from '../models/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface Irequest {
  id_project: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllActivitiesByProjectIdService {
  private activitieRepository: IActivitiesRepository;

  constructor(activitieRepository: IActivitiesRepository) {
    this.activitieRepository = activitieRepository;
  }
  public async execute({id_project}:Irequest): Promise<Activities[]> {

    const activities = await this.activitieRepository.findAllByProjectId(id_project);

    return activities;
  }
}
