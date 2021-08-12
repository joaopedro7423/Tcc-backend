import { getRepository, Like, Repository } from 'typeorm';
import Campus from '../models/Campus';

export default class CampusRepository {
  private ormRepository: Repository<Campus>;

  constructor() {
    this.ormRepository = getRepository(Campus);
  }

  //implementações de métodos:
  public async findById(id: string): Promise<Campus | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findOneByName(name: string): Promise<Campus | undefined> {
    return this.ormRepository.findOne({
      where: {name: Like(`%${name}%`)},
    });
  }

  public async findAll(): Promise<Campus[]> {
    return this.ormRepository.find();
  }

  public async findAllPaginated(page: number): Promise<[Campus[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10, //quantidade de elementos que vamos limitar por consulta
    });
  }

  public async create(name: string): Promise<Campus> {
    const campus = this.ormRepository.create({
      name,
    });



    await this.ormRepository.save(campus);
    return campus;
  }

  public async save(campus: Campus): Promise<Campus> {
    return this.ormRepository.save(campus);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
