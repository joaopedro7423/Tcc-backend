import IProjectsRepository from "../repositories/IProjectsRepository";
import Project from "../models/Project";

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProjectsService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute(): Promise<Project[]> {
    const project = await this.projectRepository.findAll();

    return project;
  }
}
