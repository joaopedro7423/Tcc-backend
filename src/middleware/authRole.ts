import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';
import UsersRepository from '../repositories/UsersRepository';

const throwError = () => {
  console.log('verifique a existência do middleware authenticate');
  throw new AppError('Usuario não autenticado', 401);
};

export const authRole = (roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<any> => {
    const { id } = req.user;

    if (!id) {
      throwError();
    }

    const user = await new UsersRepository().findById(id);

    if (!user) {
      throwError();
    }

    if (roles.includes(user.role)) {
      next();
    } else {
      throw new AppError('Permissão necessária', 401);
    }
  };
};
