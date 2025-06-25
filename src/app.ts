import express from 'express';
import "express-async-errors"; // Import this to handle async errors in express
import bodyParser from 'body-parser';
import cors from 'cors';
import  { errorHandler } from './middlewares/error-handling';import { routes } from './routes';
import uploadConfig from "@/configs/upload"


const app = express();
app.use(cors())
app.use(bodyParser.json());

app.use("/uploads", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
  
app.use(errorHandler);
 
export { app }    