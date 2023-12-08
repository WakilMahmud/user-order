import { z } from 'zod';

export const orderValidationSchema = z.object({
  productName: z.string().toLowerCase(),
  price: z.number().positive({ message: 'Price should be positive number' }),
  quantity: z
    .number()
    .nonnegative({ message: 'Quantity should be positive number' }),
});
