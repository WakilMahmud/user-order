import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (userId: number, order: IOrder) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    const createdOrder = await Order.create(order);

    await User.updateOne({ userId }, { $push: { orders: createdOrder } });
  } else {
    throw new Error('User not found');
  }
};

// const getAllOrdersFromDB = () => {};
// const getTotalPriceFromDB = () => {};

export const orderServices = {
  createOrderIntoDB,
  // getAllOrdersFromDB,
  // getTotalPriceFromDB,
};
