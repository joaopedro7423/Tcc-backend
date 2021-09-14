import Projects from '../models/Projects';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface Irequest {
  user_id: string;
  role:string
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class ListAllProjectsService {
  private projectRepository: IProjectsRepository;

  constructor(projectRepository: IProjectsRepository) {
    this.projectRepository = projectRepository;
  }
  public async execute({ user_id, role }: Irequest): Promise<Projects[]> {
    const projects = await this.projectRepository.findAll(user_id, role);

    return projects;
  }
}
