import AppError from "../errors/AppError";

import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";
import ProjectStatus from "../enums/projectStatus";
import UsersRepository from "../repositories/UsersRepository";

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
  public async execute({ id, logo }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found!", 400);
    }

     project.logo = logo;

     await this.projectRepository.save(project);

     return project;
    };
}

