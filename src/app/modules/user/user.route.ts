import express from 'express';
import { userControllers } from './user.controller';
import { orderControllers } from '../order/order.controller';
const router = express.Router();

//User routes
router.post('/', userControllers.createUser);
router.get('/', userControllers.getAllUsers);
router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateSingleUser);
router.delete('/:userId', userControllers.deleteUser);

//Order routes
router.put('/:userId/orders', orderControllers.createOrder);
router.get('/:userId/orders', orderControllers.getAllOrders);
// router.get('/total-price', orderControllers.getTotalPrice);

export const routes = router;
