import { getRepository, Like, Repository } from 'typeorm';
import CreateCourseDTO from '../dtos/ICreateCourseDTO';
import Campus from '../models/Campus';
import Courses from '../models/Courses';

export default class CoursesRepository {
  private ormRepository: Repository<Courses>;
  private ormCampusRepository: Repository<Campus>

  constructor() {
    this.ormRepository = getRepository(Courses);
    this.ormCampusRepository = getRepository(Campus)
  }

  //implementações de métodos:
  public async findById(id: string): Promise<Courses | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findAllByCampusId(
    campus_id: string,
  ): Promise<Courses[] | undefined> {
    return await this.ormRepository.find({
      where: { campus_id },
    });
  }

  public async findOneByName(
    name: string,
    campus_id: string,
  ): Promise<Courses | undefined> {
    return this.ormRepository.findOne({
      where: { name: Like(`${name}`), campus: `${campus_id}` },
    });
  }

  public async findAll(): Promise<Courses[]> {
    return this.ormRepository.find({
      relations: ['campus'],
    });
  }

  public async findAllPaginated(page: number): Promise<[Courses[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10, //quantidade de elementos que vamos limitar por consulta
    });
  }

  public async create({ name, campus_id }: CreateCourseDTO): Promise<Courses> {
    //const campus = await this.ormCampusRepository.findOne({where: {id: campus_id}});
/*
    const campus = new Campus();

    campus.id = campus_id;

    const course = new Courses();

      course.name = name
      course.campus = campus
*/
   const course =  await this.ormRepository.create({name, campus:{id:campus_id}})

    await this.ormRepository.save(course);
    return course;
  }

  public async save(course: Courses): Promise<Courses> {
    return this.ormRepository.save(course);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
