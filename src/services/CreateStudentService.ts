import { hash } from "bcrypt";
import Student from "../models/Student";
import AppError from "../errors/AppError";

import IStudentRepository from "../repositories/IStudentRepository";
import StudentRepository from "../repositories/StudentRepository";

interface Request {
  name: string;
  email: string;
  password: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class CreateStudentService {
  private studentRepository: IStudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }
  public async execute({
    name,
    email,
    password,

  }: Request): Promise<Student> {
    const studentExist = await this.studentRepository.findByEmail(email);

    if (studentExist) {
      throw new AppError("Email já utilizado", 401);
    }

    const passwordHash = await hash(password, 8);

    const student = await this.studentRepository.create({
      name,
      email,
      password: passwordHash
    });

    return student;
  }
}
