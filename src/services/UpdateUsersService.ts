import { hash } from "bcrypt";
import User from "../models/Users";
import AppError from "../errors/AppError";

import IUsersRepository from "../repositories/IUsersRepository";
import UsersRepository from "../repositories/UsersRepository";

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateUsersService {
  private userRepository: IUsersRepository;

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }
  public async execute({
    id,
    name,
    email,
    password,
    role,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!user) {
      throw new AppError("Usuario não encontrado!", 400);
    }

    //verifica se o email fornecido pelo usuário é diferente do que já tem
    if (email !== user.email) {
      const emailExist = await this.userRepository.findByEmail(email);

      //se o email fornecido pelo usuario já estiver em uso, retorna esse error
      if (emailExist) {
        throw new AppError("E-mail já está sendo usado!", 401);
      }
    }

    if (password !== user.password) {
      const passwordHash = await hash(password, 8);
      user.password = passwordHash;
    } else {
      user.password = password;
    }

    //caso se passe dessas 2 condições
    //atualizase os dados do objeto
    user.name = name;
    user.email = email;
    user.role = role;

    //salva
    await this.userRepository.save(user);

    return user;
  }
}
