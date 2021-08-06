import AppError from "../errors/AppError";

import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";
import ProjectStatus from "../enums/projectStatus";
import UsersRepository from "../repositories/UsersRepository";

interface IRequest {
  name: string;
  logo?: string; 
  user_id: string;
  description: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateProjectService {
  private projectRepository: IProjectsRepository;

  private userRepository: UsersRepository;

  constructor(
    projectRepository: IProjectsRepository,
    userRepository: UsersRepository
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
      user_id,
      description,
      logo,
      status: ProjectStatus.NEW,
    });

    return project;
  }
}
