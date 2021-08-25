import CreateCampusDTO from '../dtos/ICreateCourseDTO';
import Course from '../models/Courses';

export default interface ICoursesRepository {
  findById(id: string): Promise<Course | undefined>;
  findAll(): Promise<Course[]>;
  findOneByName(name: string, campus_id: string): Promise<Course | undefined>;
  findAllByCampusId(campus_id: string): Promise<Course[] | undefined>;
  findAllPaginated(page: number): Promise<[Course[], number]>; //esse number é para retornar a quantidade total de user no banco de dados
  create(createCampusDTO: CreateCampusDTO): Promise<Course>;
  save(course: Course): Promise<Course>;
  delete(id: string): Promise<void>;
}
