import ICreateProjectDTO from "../dtos/ICreateProjectDTO";
import Project from "../models/Projects";

export default interface IProjectsRepository {
  findAll(id:string, role:string): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(createProject: ICreateProjectDTO): Promise<Project>;
  save(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}
