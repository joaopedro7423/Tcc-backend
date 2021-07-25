import AppError from "../errors/AppError";

import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";
import IUsersRepository from "../repositories/IUsersRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class ShowProjectService {
  private projectRepository: IProjectsRepository;

  private userRepository: IUsersRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute(id: string): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found!", 400);
    }
      
    return project;
  }
}
