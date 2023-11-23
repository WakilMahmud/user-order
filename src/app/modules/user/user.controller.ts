import { Request, Response } from 'express';
import { userServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    const result = await userServices.createUserIntoDB(user);

    res.status(200).send({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(417).send({
      success: false,
      message: 'User creation failed!',
      error: {
        code: 417,
        description: 'Expectation Failed',
      },
    });
  }
};

export const userControllers = {
  createUser,
};
