import { hash } from 'bcrypt';
import User from '../models/Users';
import AppError from '../errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

import CoursesRepository from '../repositories/CoursesRepository';

interface Request {
  name: string;
  email: string;
  password: string;
  role: string;
  course_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateUsersService {
  private userRepository: IUsersRepository;

  private courseRepository: CoursesRepository;

  constructor(
    userRepository: UsersRepository,
    courseRepository: CoursesRepository,
  ) {
    this.userRepository = userRepository;

    this.courseRepository = courseRepository;
  }
  public async execute({
    name,
    email,
    password,
    role,
    course_id,
  }: Request): Promise<Omit<User, 'password'>> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError('Email já utilizado', 401);
    }

    const passwordHash = await hash(password, 8);

    const courseExist = await this.courseRepository.findById(course_id)

    if(!courseExist || undefined){
      throw new AppError('Curso não encontrado', 401);
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      role,
      course_id,
    });

    return user;
  }
}
