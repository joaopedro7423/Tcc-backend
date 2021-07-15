import "reflect-metadata";
import './config/env'
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'

import routes from './routes';
import './database'
import AppError from "./errors/AppError";

//arquivo de servidor

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    //se o erro for do tipo AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ status: 'error', message: err.message })
    }
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
    
})

app.listen(3333);
