import { hash } from "bcrypt";
import Student from "../models/Student";
import AppError from "../errors/AppError";

import IStudentRepository from "../repositories/IStudentRepository";
import StudentRepository from "../repositories/StudentRepository";

interface Request {
  id: string;
  name: string;
  email: string;
  password: string;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class UpdateStudentService {
  private studentRepository: IStudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }
  public async execute({
    id,
    name,
    email,
    password,

  }: Request): Promise<Student> {
    const student = await this.studentRepository.findById(id);

    //se o cliente não existir retorna um error
    if (!student) {
      throw new AppError("Student not found!", 400);
    }

    //verifica se o email fornecido pelo usuário é diferente do que já tem
    if (email !== student.email) {
      const emailExist = await this.studentRepository.findByEmail(email);

      //se o email fornecido pelo usuario já estiver em uso, retorna esse error
      if (emailExist) {
        throw new AppError("E-mail já está sendo usado!", 401);
      }
    }

    if (password !== student.password) {
      const passwordHash = await hash(password, 8);
      student.password = passwordHash;
    } else {
      student.password = password;
    }

    //caso se passe dessas 2 condições
    //atualizase os dados do objeto
    student.name = name;
    student.email = email;
    

    //salva
    await this.studentRepository.save(student);

    return student;
  }
}
