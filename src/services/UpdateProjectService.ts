import AppError from '../errors/AppError';

import IProjectsRepository from '../repositories/IProjectsRepository';
import Project from '../models/Project';
import ProjectStatus from '../enums/projectStatus';

interface IRequest {
  id: string;
  title: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProjectService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute({
    id,
    title,

    description,
  }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!', 400);
    }

    project.title = title;

    project.description = description;

    await this.projectRepository.save(project);

    return project;
  }
}
