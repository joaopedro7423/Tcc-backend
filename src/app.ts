import 'express-async-errors';
import 'reflect-metadata';
import './config/env';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import './database';
import routes from './routes';
import AppError from './errors/AppError';

import { resolve } from 'path';
import { createConnection } from 'typeorm';

//arquivo de servidor

createConnection()

const app = express();

app.use(express.json());
app.use(cors());
app.use('/files', express.static(resolve(__dirname, '..', 'uploads'))); //rota para poder visualizar a imagem
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  //se o erro for do tipo AppError
  //   console.log(err)
  if (err instanceof AppError) {
    console.log(err);
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err);
  return res
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

export default app