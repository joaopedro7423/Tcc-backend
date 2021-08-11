import { getRepository, Like, Repository } from "typeorm";
import CreateStudentDTO from "../dtos/CreateStudentDTO";
import Student from "../models/Student";
import IStudentRepository from "./IStudentRepository";

export default class StudentRepository implements IStudentRepository {
  private ormRepository: Repository<Student>;

  constructor() {
    this.ormRepository = getRepository(Student);
  }

  //implementações de métodos:
  public async findById(id: string): Promise<Student | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Student | undefined> {
    const studente = await this.ormRepository.findOne({
      where: { email },
    });

    return studente;
  }

  public async findAllByName(name: string): Promise<Student[]> {
    return this.ormRepository.find({
      name: Like(`%${name}%`),
    });
  }

  public async findAll(): Promise<Student[]> {
    return this.ormRepository.find();
  }

  public async findAllPaginated(page: number): Promise<[Student[], number]> {
    return this.ormRepository.findAndCount({
      skip: page,
      take: 10, //quantidade de elementos que vamos limitar por consulta
    });
  }

  public async create({
    name,
    email,
    password,
  }: CreateStudentDTO): Promise<Student> {
    const studente = this.ormRepository.create({
      name,
      email,
      password,
    });
    await this.ormRepository.save(studente);
    return studente;
  }

  public async save(studente: Student): Promise<Student> {
    return this.ormRepository.save(studente);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
