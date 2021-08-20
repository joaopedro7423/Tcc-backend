import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { ICustomJWTPayload } from '../interfaces/ICustomJWTPayload';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing!', 401);
  }

  //Emana o Bearer e o token, o split devolve o token
  const [, token] = authHeader.split(' ');

  try {
    const payload = jwt.verify(
      token,
      String(process.env.APP_SECRET),
    ) as ICustomJWTPayload;

    req.body.user_id = payload.id;
    //console.log(payload.role)

    req.user = {
      role: payload.role,
      id: payload.id,
      course_id: payload.course_id,
    };

    console.log(req.user);

    next();
  } catch (error) {
    throw new AppError('JWT token is invalid!', 401);
  }
};
