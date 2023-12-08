/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    const { userId } = req.params;

    const orderParsedData = orderValidationSchema.parse(order);

    await orderServices.createOrderIntoDB(Number(userId), orderParsedData);

    res.status(200).send({
      success: true,
      message: 'Order created successfully!',
      data: null,
    });
  } catch (err: any) {
    res.status(404).send({
      success: false,
      message: err?.message || 'something went wrong',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};

// const getAllOrders = (req: Request, res: Response) => {};
// const getTotalPrice = (req: Request, res: Response) => {};

export const orderControllers = {
  createOrder,
  // getAllOrders,
  // getTotalPrice
};
