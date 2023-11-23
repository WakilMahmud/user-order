import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('User Order Management!');
});

export default app;
