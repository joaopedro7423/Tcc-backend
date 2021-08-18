import validator from 'validator';

import AppError from '../errors/AppError';


import ICoursesRepository from '../repositories/ICoursesRepository';
import CoursesRepository from '../repositories/CoursesRepository';

//essa parada (Service) aqui que se faz as regras de negócio
export default class DeleteCourseService {
  private courseRepository: ICoursesRepository;

  constructor(courseRepository: CoursesRepository) {
    this.courseRepository = courseRepository;
  }
  public async execute(id: string): Promise<void> {
    
    if (!validator.isUUID(id)) {
      throw new AppError('Codigo  invalido!', 400);
    }

    const courseExist = await this.courseRepository.findById(id);

    if (!courseExist) {
      throw new AppError('Curso não existe', 401);
    }
    await this.courseRepository.delete(id);
  }
}
