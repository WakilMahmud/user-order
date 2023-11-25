import { Schema, model } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
  productName: String,
  price: Number,
  quantity: Number,
});

export const Order = model<IOrder>('Order', orderSchema);
