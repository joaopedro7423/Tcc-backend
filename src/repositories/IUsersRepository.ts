import CreateUsersDTO from '../dtos/ICreateUsersDTO';
import User from '../models/Users';

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  findAllByName(name: string): Promise<User[]>;
  findAllPaginated(page: number): Promise<[User[], number]>; //esse number é para retornar a quantidade total de user no banco de dados
  create(CreateUsersDTO: CreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
