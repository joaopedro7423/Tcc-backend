import { Request, Response } from "express";

import UsersRepository from "../repositories/UsersRepository";
import CreateUsersService from "../services/CreateUsersService";
import UpdateUsersService from "../services/UpdateUsersService";

export default class UserController {
  //para achar todos os users listar claro
  public async index(req: Request, res: Response): Promise<Response> {
    const userRepository = new UsersRepository();

    const users = await userRepository.findAll();

    return res.json(users);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password, role } = req.body;

    const userRepository = new UsersRepository();
    const createUsers = new CreateUsersService(userRepository);

    const user = await createUsers.execute({
      name,
      email,
      password,
      role,
    });

    //não é legal fiar retornando password ou alguns dados sensiveis então se usa isso:
    delete user.password;

    return res.status(201).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const userRepository = new UsersRepository();
    const updateUsers = new UpdateUsersService(userRepository);

    const user = await updateUsers.execute({
      id,
      name,
      email,
      password,
      role,
    });

    return res.json(user);
  }
}
