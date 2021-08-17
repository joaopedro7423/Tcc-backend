import { getRepository, Like, Repository } from 'typeorm';
import CreateCampusDTO from '../dtos/CreateCampusDTO';
import Courses from '../models/Course';

export default class CoursesRepository {
  private ormRepository: Repository<Courses>;

  constructor() {
    this.ormRepository = getRepository(Courses);
  }

  //implementações de métodos:
  public async findById(id: string): Promise<Courses | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findAllByCampusId(campus_id: string): Promise<Courses[] | undefined> {
    return await this.ormRepository.find({
      where: { campus_id },
    });
  }

  public async findOneByName(name: string, campus_id: string): Promise<Courses | undefined> {
    return this.ormRepository.findOne({
      where: { name: Like(`${name}`) , campus_id: `${campus_id}`},
      
    });
  }

  public async findAll(): Promise<Courses[]> {
    return this.ormRepository.find({
      relations: ["campus"]
    });
  }

  public async findAllPaginated(page: number): Promise<[Courses[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10, //quantidade de elementos que vamos limitar por consulta
    });
  }

  public async create({ name, campus_id }: CreateCampusDTO): Promise<Courses> {
    const campus = this.ormRepository.create({
      name,
      campus_id,
    });

    await this.ormRepository.save(campus);
    return campus;
  }

  public async save(course: Courses): Promise<Courses> {
    return this.ormRepository.save(course);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
