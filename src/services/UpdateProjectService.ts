import AppError from "../errors/AppError";

import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";
import ProjectStatus from "../enums/projectStatus";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  id: string;
  name: string;
  logo?: string;
  description: string;
  user_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateProjectService {
  private projectRepository: IProjectsRepository;

  private userRepository: IUsersRepository;

  constructor(
    projectRepository: IProjectsRepository,
    userRepository: IUsersRepository
  ) {
    this.projectRepository = projectRepository;
    this.userRepository = userRepository;
  }
  public async execute({
    id,
    name,
    user_id,
    description,
    logo,
  }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new AppError("Project not found!", 400);
    }

    const userExist = await this.userRepository.findById(user_id);

    if (!userExist) {
      throw new AppError("User not found!", 400);
    }

    project.name = name;
    project.user_id = user_id;
    project.description = description;
    project.logo = logo;

    await this.projectRepository.save(project);

    return project;
  }
}
