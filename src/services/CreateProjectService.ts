import AppError from '../errors/AppError';

import IProjectsRepository from '../repositories/IProjectsRepository';
import ProjectStatus from '../enums/ActivitiesStatus';
import UsersRepository from '../repositories/UsersRepository';
import Projects from '../models/Projects';

interface IRequest {
  title: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateProjectService {
  private projectRepository: IProjectsRepository;


  constructor(
    projectRepository: IProjectsRepository,
  ) {
    this.projectRepository = projectRepository;
  }
  public async execute({ title, description }: IRequest): Promise<Projects> {
    const project = await this.projectRepository.create({
      title,
      description,
      //   status: ProjectStatus.NEW,
    });

    return project;
  }
}
