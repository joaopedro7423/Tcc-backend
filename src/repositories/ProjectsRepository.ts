import { getRepository, Repository } from "typeorm";
import ICreateProjectDTO from "../dtos/ICreateProjectDTO";
import Project from "../models/Project";
import IProjectsRepository from "./IProjectsRepository";

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAll(): Promise<Project[]> {
    return this.ormRepository.find({
      relations: ["user"],
    });
  }
  public async findById(id: string): Promise<Project | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ["user"],
    });
  }
  public async create({
    name,
    user_id,
    student_id,
    description,
    logo,
    status,
  }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({
      name,
      user_id,
      student_id,
      description,
      logo,
      status,
    });
    await this.ormRepository.save(project);
    return project;
  }

  public async save(project: Project): Promise<Project> {
    return this.ormRepository.save(project);
  }
}

export default ProjectsRepository;
