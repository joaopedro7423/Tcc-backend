import  Projects  from "../models/Projects";
import IProjectsRepository from "../repositories/IProjectsRepository";

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProjectsService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute(): Promise<Projects[]> {
    const projects = await this.projectRepository.findAll();

    return projects;
  }
}
