import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (userId: number, order: IOrder) => {
  await Order.create({ userId: userId, ...order });
};
const getAllOrdersFromDB = () => {};
const getTotalPriceFromDB = () => {};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  getTotalPriceFromDB,
};
