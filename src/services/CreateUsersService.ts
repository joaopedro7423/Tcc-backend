import { hash } from "bcrypt";
import User from "../models/Users";
import AppError from "../errors/AppError";

import IUsersRepository from "../repositories/IUsersRepository";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  name: string;
  email: string;
  password: string;
  role: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateUsersService {
  private userRepository: IUsersRepository;

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }
  public async execute({
    name,
    email,
    password,
    role,
  }: Request): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email);

    if (userExist) {
      throw new AppError("Email já utilizado", 401);
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      role,
    });

    return user;
  }
}