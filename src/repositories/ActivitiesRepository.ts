import { getRepository, Repository } from 'typeorm';
import CreateActivitiesDTO from '../dtos/ICreateActivitiesDTO';
import Activities from '../models/Activities';

export default class ActivitiesRepository {
  private ormRepository: Repository<Activities>;

  constructor() {
    this.ormRepository = getRepository(Activities);
  }

  public async findById(id: string): Promise<Activities | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findAllByProjectId(
    project_id: string,
  ): Promise<Activities[] | undefined> {
    return await this.ormRepository.find({
      where: { project: { id: project_id } },
    });
  }

  public async findAll(): Promise<Activities[]> {
    return await this.ormRepository.find();
  }

  public async create({
    title,
    description,
    project_id,
    status,
  }: CreateActivitiesDTO): Promise<Activities> {
    const activitie = this.ormRepository.create({
      title,
      description,
      project: { id: project_id },
      status,
    });

    await this.ormRepository.save(activitie);
    return activitie;
  }

  public async save(activitie: Activities): Promise<Activities> {
    return this.ormRepository.save(activitie);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
