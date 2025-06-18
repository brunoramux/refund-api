import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  { errorHandler } from './middlewares/error-handling';import { routes } from './routes';
s

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(routes)
  
app.use(errorHandler);

export { app }    