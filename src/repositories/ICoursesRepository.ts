import CreateCampusDTO from '../dtos/CreateCampusDTO';
import Course from '../models/Course';

export default interface ICoursesRepository {
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
  findOneByName(name: string, campus_id: string): Promise<Course | undefined>;
  findAllByCampusId(campus_id: string): Promise<Course[] | undefined>;
  findAllPaginated(page: number): Promise<[Course[], number]>; //esse number é para retornar a quantidade total de user no banco de dados
  create(CreateCampusDTO: CreateCampusDTO): Promise<Course>;
  save(course: Course): Promise<Course>;
  delete(id: string): Promise<void>;
}
