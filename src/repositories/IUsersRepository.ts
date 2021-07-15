import CreateUsersDTO from '../dtos/CreateUsersDTO';
import User from '../models/Users';

export default interface IUsersRepository {
    findByEmail(email: string): Promise<User | undefined>;
    create(CreateUsersDTO: CreateUsersDTO): Promise<User>;
}