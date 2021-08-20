import { Request, Response } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import SessionUsersService from '../services/SessionService';

export default class SessionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const userRepository = new UsersRepository();
    const createSession = new SessionUsersService(userRepository);

    const session = await createSession.execute({
      email,
      password,
    });

    return res.json(session);
  }
}
