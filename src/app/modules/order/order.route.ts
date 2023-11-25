import express from 'express';
import { orderControllers } from './order.controller';

const router = express.Router();

router.put('/:userId/orders', orderControllers.createOrder);
router.get('/:userId/orders', orderControllers.getAllOrders);
router.get('/:userId/orders/total-price', orderControllers.getTotalPrice);

export const orderRoutes = router;
