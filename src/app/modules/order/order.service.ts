import { User } from '../user/user.model';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (userId: number, order: IOrder) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    const createdOrder = await Order.create(order);

    await User.updateOne({ userId }, { $push: { orders: createdOrder._id } });
  } else {
    throw new Error('User not found');
  }
};

const getAllOrdersFromDB = async (userId: number) => {
  const existingUser = await User.isUserExists(userId);

  if (existingUser) {
    const currentUser = await User.findOne({ userId });
    // console.log(currentUser);
    const allOrders = await currentUser?.populate('orders', '-_id -__v');

    // console.log(allOrders);
    return allOrders?.orders;
  } else throw new Error('User not found');
};
// const getTotalPriceFromDB = () => {};

export const orderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
  // getTotalPriceFromDB,
};
