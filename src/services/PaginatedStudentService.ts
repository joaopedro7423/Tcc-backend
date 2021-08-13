import IPaginated from "../interfaces/IPagineted";
import Student from "../models/Student";
import IStudentRepository from "../repositories/IStudentRepository";
import StudentRepository from "../repositories/StudentRepository";

interface Request {
  page: number;
}

//essa parada (Service) aqui que se faz as regras de negócio
export default class PaginatedStudentService {
  private studentRepository: IStudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }
  public async execute({ page }: Request): Promise<IPaginated<Student>> {
    const [student, total] = await this.studentRepository.findAllPaginated(page * 10);

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<Student> = {
      data: student,
      totalElementos: total,
      page,
      elements: student.length,
      elementsPerPage: 10,
      totalPages,
      fistPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}
