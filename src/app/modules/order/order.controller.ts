import { Request, Response } from 'express';
import { orderValidationSchema } from './order.validation';
import { orderServices } from './order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const { order } = req.body;
    const { userId } = req.params;

    const orderParsedData = orderValidationSchema.parse(order);

    const result = await orderServices.createOrderIntoDB(
      Number(userId),
      orderParsedData,
    );

    res.status(200).send({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(417).send({
      success: false,
      message: err?.message || 'something went wrong',
      error: {
        code: 417,
        description: 'Expectation Failed',
      },
    });
  }
};

const getAllOrders = (req: Request, res: Response) => {};
const getTotalPrice = (req: Request, res: Response) => {};

export const orderControllers = { createOrder, getAllOrders, getTotalPrice };
