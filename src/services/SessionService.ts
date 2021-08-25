import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import  Users  from '../models/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
}

interface Response {
  token: string;
  user: Users;
}
//SERVIÇO DE AUTENTICAÇÃO
//essa parada (Service) aqui que se faz as regras de negócio
export default class SessionUsersService {
  private userRepository: IUsersRepository;

  constructor(userRepository: UsersRepository) {
    this.userRepository = userRepository;
  }
  public async execute({ email, password }: Request): Promise<Response> {
    //verifica se o usuario existe
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email não compativel', 401);
    }

    //agora vai comparar a senha que vai ser passada com a senha do banco
    //usa o método compare do próprio bcrypt
    const passwordCompare = await compare(password, user.password);
    if (!passwordCompare) {
      throw new AppError('Senha não compativel', 401);
    }

    //Conferiu se esta com email e senha certos, agora se cria um token
    const token = sign(
      { id: user.id, role: user.role, course_id: user.course_id },
      process.env.APP_SECRET,
      {
        expiresIn: '1d',
      },
    );

    delete user.password;

    return {
      token,
      user,
    };
  }
}
