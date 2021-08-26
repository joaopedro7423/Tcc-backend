import { getRepository, Repository } from 'typeorm';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../models/Projects';
import IProjectsRepository from './IProjectsRepository';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAll(): Promise<Project[]> {
    return this.ormRepository.find({
      relations: ['proposals', 'proposals.userAccept', 'proposals.userCreate'],
    });
  }
  public async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['proposals', 'proposals.userAccept', 'proposals.userCreate'],
    });
  }
  public async create({
    title,
    description,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      title,
      description,
    });
    await this.ormRepository.save(project);
    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}

export default ProjectsRepository;
