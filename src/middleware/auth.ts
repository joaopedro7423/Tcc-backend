import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import AppError from "../errors/AppError";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing!", 401);
  }

  //Emana o Bearer e o token, o split devolve o token
  const [, token] = authHeader.split(" ");

  try {
    jwt.verify(token, String(process.env.APP_SECRET));
    next();
  } catch (error) {
    throw new AppError("JWT token is invalid!", 401);
  }
};
