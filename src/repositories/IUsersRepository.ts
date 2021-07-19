import CreateUsersDTO from "../dtos/CreateUsersDTO";
import User from "../models/Users";

export default interface IUsersRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
  create(CreateUsersDTO: CreateUsersDTO): Promise<User>;
  save(user: User): Promise<User>;
}
