import ActivitiesStatus from '../enums/ActivitiesStatus';
import Activities from '../models/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface IRequest {
  title: string;
  description: string;
  project_id: string;
}

export default class CreateActivitiesService {
  private activitieRepository: IActivitiesRepository;

  constructor(activitieRepository: IActivitiesRepository) {
    this.activitieRepository = activitieRepository;
  }

  public async execute({
    title,
    description,
    project_id,
  }: IRequest): Promise<Activities> {
    const activitie = await this.activitieRepository.create({
      title,
      description,
      project_id,
      status: ActivitiesStatus.NEW,
    });

    return activitie;
  }
}
