import { getRepository, Repository } from 'typeorm';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';
import Project from '../models/Projects';
import IProjectsRepository from './IProjectsRepository';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAll(id: string, role:string): Promise<Project[]> {
   /* return  this.ormRepository
    .createQueryBuilder('pro')
    .innerJoinAndSelect('pro.proposals', 'proposals')
    .innerJoinAndSelect('proposals.userAccept', 'userAccept')
    .where('userCreate.id = :id OR userAccept.id = :id', { id: id })
    .andWhere('proposals.user_accept_id is not null ')
    .getMany();
*/
return this.ormRepository.query(`
select
*
from public.projects
inner join public.proposals on (proposals.project_id = projects.id)
inner join users  on (users.id = proposals.user_accept_id or users.id = proposals.user_create_id)
where ((proposals.user_accept_id = $1)
OR (proposals.user_create_id = $1))
AND users.role = $2`,[id, role])
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
