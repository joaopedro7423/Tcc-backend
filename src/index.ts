import './config/env'
import "reflect-metadata";
import * as express from "express";
import { createConnection } from 'typeorm';

import routes from './routes'
import './database'

//arquivo de servidor

const app = express();

app.use(express.json());
app.use(routes);
app.listen(3333);

