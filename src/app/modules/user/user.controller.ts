import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;

    const userParsedData = userValidationSchema.parse(user);

    const result = await userServices.createUserIntoDB(userParsedData);

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
        error: error,
      },
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();

    res.status(200).send({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'Users not found',
      error: {
        code: 404,
        description: 'Users not found!',
      },
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(Number(userId));

    res.status(200).send({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        error,
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { user } = req.body;

    const userParsedData = userValidationSchema.parse(user);

    const result = await userServices.updateSingleUserIntoDB(
      Number(userId),
      userParsedData,
    );

    res.status(200).send({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
        error,
      },
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    await userServices.deleteUserFromDB(Number(userId));

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(417).send({
      success: false,
      message: 'User not deleted',
      error: {
        code: 417,
        description: 'Expectation failed!',
      },
    });
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
