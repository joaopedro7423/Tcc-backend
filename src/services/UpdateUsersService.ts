import { hash } from 'bcrypt';
import validator from 'validator';

import AppError from '../errors/AppError';
import Users from '../models/Users';
import CoursesRepository from '../repositories/CoursesRepository';

import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  course_id: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateUsersService {
  private userRepository: IUsersRepository;

  private coursersRepository: CoursesRepository;

  constructor(
    userRepository: UsersRepository,
    coursersRepository: CoursesRepository,
  ) {
    this.userRepository = userRepository;
    this.coursersRepository = coursersRepository;
  }
  public async execute({
    id,
    name,
    email,
    password,
    role,
    course_id,
  }: Request): Promise<Users> {
    const user = await this.userRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!user) {
      throw new AppError('Usuario não encontrado!', 400);
    }

    //verifica se o email fornecido pelo usuário é diferente do que já tem
    if (email !== user.email) {
      const emailExist = await this.userRepository.findByEmail(email);

      //se o email fornecido pelo usuario já estiver em uso, retorna esse error
      if (emailExist) {
        throw new AppError('E-mail já está sendo usado!', 401);
      }
    }

    if (password !== user.password) {
      const passwordHash = await hash(password, 8);
      user.password = passwordHash;
    } else {
      user.password = password;
    }

    if (!validator.isUUID(course_id)) {
      throw new AppError('Codigo do curso invalido!', 400);
    }

    const curso = await this.coursersRepository.findById(course_id);

    if (!curso) {
      throw new AppError('Curso não existe!', 400);
    }

    curso.id = course_id;

    //caso se passe dessas 2 condições
    //atualizase os dados do objeto
    user.name = name;
    user.email = email;
    user.role = role;
    user.course = curso;
    //salva
    await this.userRepository.save(user);

    return user;
  }
}
