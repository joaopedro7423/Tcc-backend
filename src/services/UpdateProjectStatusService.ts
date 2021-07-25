import AppError from "../errors/AppError";

import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";
import ProjectStatus from "../enums/projectStatus";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  id: string;
  status: ProjectStatus;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProjectStatusService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute({ id, status }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found!", 400);
    }

    project.status = status;
    await this.projectRepository.save(project);

    return project;
  }
}
