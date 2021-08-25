import AppError from '../errors/AppError';
import  Projects  from '../models/Projects';

import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  id: string;
  logo: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UploadLogoOfProjectProjectService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute({ id, logo }: IRequest): Promise<Projects> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Project not found!', 400);
    }

    project.logo = logo;

    await this.projectRepository.save(project);

    return project;
  }
}
