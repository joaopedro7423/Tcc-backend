import AppError from '../errors/AppError';

import ICoursesRepository from '../repositories/ICoursesRepository';
import Course from '../models/Course';
import CampusRepository from '../repositories/CampusRepository';

interface IRequest {
  name: string;
  campus_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateCoursesService {
  private coursesRepository: ICoursesRepository;

  private campusRepository: CampusRepository;

  constructor(
    coursesRepository: ICoursesRepository,
    campusRepository: CampusRepository,
  ) {
    this.coursesRepository = coursesRepository;
    this.campusRepository = campusRepository;
  }
  public async execute({ name, campus_id }: IRequest): Promise<Course> {
    const campusExist = await this.campusRepository.findById(campus_id);

    if (!campusExist) {
      throw new AppError('Campus not found!', 400);
    }

    const course = await this.coursesRepository.create({
      name,
      campus_id,
    });

    return course;
  }
}
