/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { routes } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('User Order Management!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    success: false,
    message: 'User not found',
    error: {
      code: 404,
      description: 'Something went wrong!',
    },
  });
  next();
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send({
    success: false,
    message: 'Route not found',
    error: {
      code: 404,
      description: 'Route not found!',
    },
  });
  next();
});

export default app;
