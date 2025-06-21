import express from 'express';
import "express-async-errors"; // Import this to handle async errors in express
import bodyParser from 'body-parser';
import cors from 'cors';
import  { errorHandler } from './middlewares/error-handling';import { routes } from './routes';


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(routes)
  
app.use(errorHandler);
 
export { app }    