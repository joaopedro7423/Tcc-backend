import express, { NextFunction, Request, Response } from 'express';
import './database'
import routes from './routes';
import AppError from "./errors/AppError";

import "reflect-metadata";
import './config/env'
import 'express-async-errors'
import cors from 'cors'
import {resolve} from 'path'


//arquivo de servidor

const app = express();

app.use(express.json());
app.use(cors())
app.use('/files', express.static(resolve(__dirname, '..', 'uploads'))); //rota para poder visualizar a imagem 
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
    //se o erro for do tipo AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ status: 'error', message: err.message })
    }
   // console.log(err)
    return res.status(500).json({ status: 'error', message: 'Internal server error' })
    
})

app.listen(3333);
