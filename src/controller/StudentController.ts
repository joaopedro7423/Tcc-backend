import { Request, Response } from "express";

import StudentRepository from "../repositories/StudentRepository";
import CreateStudentService from "../services/CreateStudentService";
import DeleteStudentService from "../services/DeleteStudentService";
import PaginatedStudentService from "../services/PaginatedStudentService";
import UpdatStudentService from "../services/UpdatStudentService";

export default class StudentController {
  //para achar todos os student listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const studentRepository = new StudentRepository();

    const student = await studentRepository.findAll();

    return res.json(student);
  }

  public async paginated(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;

    const studentRepository = new StudentRepository();
    const studentPaginated = new PaginatedStudentService(studentRepository);

    const student = await studentPaginated.execute({
      //se o page for diferente de undefined transforma para string como decimal se não passa a pagina 0
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return res.json(student);
  }

  public async search(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;

    const studentRepository = new StudentRepository();

    const student = await studentRepository.findAllByName(
      name.toString() || ""
    );

    return res.json(student);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const studentRepository = new StudentRepository();
    const createStudent = new CreateStudentService(studentRepository);

    const student = await createStudent.execute({
      name,
      email,
      password,
    });

    //não é legal fiar retornando password ou alguns dados sensiveis então se usa isso:
    delete student.password;

    return res.status(201).json(student);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const studentRepository = new StudentRepository();
    const updateStudent = new UpdatStudentService(studentRepository);

    const student = await updateStudent.execute({
      id,
      name,
      email,
      password,
    });

    return res.json(student);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const studentRepository = new StudentRepository();
    const destroyUsers = new DeleteStudentService(studentRepository);
    await destroyUsers.execute(id);

    return res.status(204).send();
  }
}
