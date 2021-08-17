import AppError from '../errors/AppError';

import ICoursesRepository from '../repositories/ICoursesRepository';
import Course from '../models/Course';
import CampusRepository from '../repositories/CampusRepository';

interface IRequest {
  id: string;
  name: string;
  campus_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateCourseService {
  private coursesRepository: ICoursesRepository;

  private campusRepository: CampusRepository;

  constructor(
    coursesRepository: ICoursesRepository,
    campusRepository: CampusRepository,
  ) {
    this.coursesRepository = coursesRepository;
    this.campusRepository = campusRepository;
  }
  public async execute({ id, name, campus_id }: IRequest): Promise<Course> {
    const course = await this.coursesRepository.findById(id);

    if (!course) {
      throw new AppError('Course not found!', 400);
    }

    const nameUpper = name.toUpperCase().trim();

    if (nameUpper !== course.name) {
      const campusExist = await this.coursesRepository.findOneByName(nameUpper, campus_id);
      if (campusExist) {
        throw new AppError('Esse campus já é cadastrado!', 401);
      }
    } else {
      throw new AppError('Curso com nome fornecido igual!', 401);
    }

    const campusExist = await this.campusRepository.findById(campus_id);

    if (!campusExist) {
      throw new AppError('Campus not found!', 400);
    }

    course.name = nameUpper;
    course.campus_id = campus_id;

    await this.coursesRepository.save(course);

    return course;
  }
}
