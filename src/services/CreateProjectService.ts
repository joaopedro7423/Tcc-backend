import AppError from '../errors/AppError';

import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';
import ProjectStatus from '../enums/projectStatus';
import UsersRepository from '../repositories/UsersRepository';

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
  public async execute({ title, description }: IRequest): Promise<Project> {
    const project = await this.projectRepository.create({
      title,
      description,
      //   status: ProjectStatus.NEW,
    });

    return project;
  }
}
