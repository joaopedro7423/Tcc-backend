import { Request, Response } from 'express';
import CoursesRepository from '../repositories/CoursesRepository';

import UsersRepository from '../repositories/UsersRepository';
import CreateUsersService from '../services/CreateUsersService';
import DeleteUsersService from '../services/DeleteUsersService';
import PaginatedUsersService from '../services/PaginatedUsersService';
import UpdateUsersService from '../services/UpdateUsersService';

export default class UserController {
  //para achar todos os users listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = new UsersRepository();

    const users = await userRepository.findAll();

    return res.json(users);
  }

  public async paginated(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;

    const userRepository = new UsersRepository();
    const userPaginated = new PaginatedUsersService(userRepository);

    const users = await userPaginated.execute({
      //se o page for diferente de undefined transforma para string como decimal se não passa a pagina 0
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return res.json(users);
  }

  public async search(req: Request, res: Response): Promise<Response> {
    const { name } = req.query;

    const userRepository = new UsersRepository();

    const users = await userRepository.findAllByName(name.toString() || '');

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role, course_id } = req.body;

    const userRepository = new UsersRepository();
    const courseRepository = new CoursesRepository();
    const createUsers = new CreateUsersService(
      userRepository,
      courseRepository,
    );

    const user = await createUsers.execute({
      name,
      email,
      password,
      role,
      course_id,
    });

    //não é legal fiar retornando password ou alguns dados sensiveis então se usa isso:
    //  delete user.password;

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, role, course_id } = req.body;

    const userRepository = new UsersRepository();
    const coursersRepository = new CoursesRepository();
    const updateUsers = new UpdateUsersService(
      userRepository,
      coursersRepository,
    );

    const user = await updateUsers.execute({
      id,
      name,
      email,
      password,
      role,
      course_id,
    });

    return res.json(user);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = new UsersRepository();
    const destroyUsers = new DeleteUsersService(userRepository);
    await destroyUsers.execute(id);

    return res.status(204).send();
  }
}
