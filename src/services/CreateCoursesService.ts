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
    const nameUpper = name.toUpperCase().trim();

    const campusExist = await this.campusRepository.findById(campus_id);

    if (!campusExist) {
      throw new AppError('Campus not found!', 400);
    }

    const courseExist = await this.coursesRepository.findOneByName(nameUpper);

    if (courseExist) {
      throw new AppError('Curso já cadastrado no campus!', 400);
    }

    name = nameUpper;

    const course = await this.coursesRepository.create({
      name,
      campus_id,
    });

    return course;
  }
}
