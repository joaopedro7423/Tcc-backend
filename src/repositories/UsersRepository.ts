import { getRepository, Like, Repository } from "typeorm";
import CreateUsersDTO from "../dtos/CreateUsersDTO";
import User from "../models/Users";
import IUsersRepository from "./IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  //implementações de métodos:
  public async findById(id: string): Promise<User | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllByName(name: string): Promise<User[]> {
    return this.ormRepository.find({
      name: Like(`%${name}%`),
    });
  }

  public async findAll(): Promise<User[]> {
    return this.ormRepository.find({
      relations: ["course" , "course.campus"],
    });
  }

  public async findAllPaginated(page: number): Promise<[User[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10, //quantidade de elementos que vamos limitar por consulta
    });
  }

  public async create({
    name,
    email,
    password,
    role,
    course_id
  }: CreateUsersDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      email,
      password,
      role,
      course:{id: course_id}
    });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
