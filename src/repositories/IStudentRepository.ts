import CreateStudentDTO from "../dtos/CreateStudentDTO";
import Student from '../models/Student';

export default interface IStudentRepository {
  findByEmail(email: string): Promise<Student | undefined>;
  findById(id: string): Promise<Student | undefined>;
  findAll(): Promise<Student[]>;
  findAllByName(name: string): Promise<Student[]>;
  findAllPaginated(page: number): Promise<[Student[], number]>; //esse number é para retornar a quantidade total de user no banco de dados
  create(CreateStudentDTO: CreateStudentDTO): Promise<Student>;
  save(student: Student): Promise<Student>;
  delete(id: string): Promise<void>;

}
