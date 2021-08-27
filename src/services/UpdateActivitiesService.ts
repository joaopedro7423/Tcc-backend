import AppError from '../errors/AppError';
import Activities from '../models/Activities';
import IActivitiesRepository from '../repositories/IActivitiesRepository';

interface IRequest {
  id: string;
  title: string;
  description: string;
}

export default class UpdateActivitiesService {
  private activitieRepository: IActivitiesRepository;

  constructor(activitieRepository: IActivitiesRepository) {
    this.activitieRepository = activitieRepository;
  }

  public async execute({
    id,
    title,
    description,
  }: IRequest): Promise<Activities> {
    const activitie = await this.activitieRepository.findById(id);

    if (!activitie) {
      throw new AppError('Proposal not found!', 400);
    }

    activitie.title = title;
    activitie.description = description;

    await this.activitieRepository.save(activitie);

    return activitie;
  }
}
