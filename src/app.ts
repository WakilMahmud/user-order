import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';
import { orderRoutes } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', orderRoutes);
app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('User Order Management!');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(404).send('Not Found!');
  next();
});

export default app;
