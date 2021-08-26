import validator from 'validator';

import AppError from '../errors/AppError';

import IProjectsRepository from '../repositories/IProjectsRepository';
import ProjectsRepository from '../repositories/ProjectsRepository';

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteProjectService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: ProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute(id: string): Promise<void> {
    if (!validator.isUUID(id)) {
      throw new AppError('Codigo  invalido!', 400);
    }

    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError('Projeto não existe', 401);
    }
    await this.projectRepository.delete(id);
  }
}
