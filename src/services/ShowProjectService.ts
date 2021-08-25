import AppError from "../errors/AppError";
import  Projects  from "../models/Projects";

import IProjectsRepository from "../repositories/IProjectsRepository";
import IUsersRepository from "../repositories/IUsersRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class ShowProjectService {
  private projectRepository: IProjectsRepository;

  private userRepository: IUsersRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute(id: string): Promise<Projects> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found!", 400);
    }
      
    return project;
  }
}
