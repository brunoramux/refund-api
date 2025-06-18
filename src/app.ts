import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import  { errorHandler } from './middlewares/error-handling';

const app = express();
app.use(cors())
app.use(bodyParser.json());
  
app.use(errorHandler);

export { app }    