import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";
import UsersRepository from "../repositories/UsersRepository";

const throwError = () => {
  console.log('verifique a existencia do middleware authenticate')
  throw new AppError('Usuario não autenticado', 401)
}

export const onlyAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { user_id } = req.body;

  if (!user_id) {
    throwError()
  }

  const user = await new UsersRepository().findById(user_id)

  if (!user) {
    throwError()
  }
  
  if (user.role === 'professor') {
    next()
  } else { 
    throw new AppError('Permissão necessária', 401)
  }
};