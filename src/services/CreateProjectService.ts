import AppError from "../errors/AppError";

import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";
import ProjectStatus from "../enums/projectStatus";
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequest {
  name: string;
  logo?: string;
  description: string;
  user_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateProjectService {
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
    name,
    user_id,
    description,
    logo,
  }: IRequest): Promise<Project> {
    const userExist = await this.userRepository.findById(user_id);

    if (!userExist) {
      throw new AppError("User not found!", 400);
    }

    const project = await this.projectRepository.create({
      name,
      description,
      logo,
      user_id,
      status: ProjectStatus.NEW,
    });

    return project;
  }
}
