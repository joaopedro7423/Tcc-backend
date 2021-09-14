import CreateActivitiesDTO from '../dtos/ICreateActivitiesDTO';
import Activities from '../models/Activities';

export default interface IActivitiesRepository {
  findById(id: string): Promise<Activities | undefined>;
  findAllByProjectId(project_id: string): Promise<Activities[] | undefined>;
  findAll(): Promise<Activities[]>;
  create(createActivitiesDTO: CreateActivitiesDTO): Promise<Activities>;
  save(course: Activities): Promise<Activities>;
  delete(id: string): Promise<void>;
}
