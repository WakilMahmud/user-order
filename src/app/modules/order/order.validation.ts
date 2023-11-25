import { z } from 'zod';

export const orderValidationSchema = z.object({
  productName: z.string(),
  price: z.number().positive(),
  quantity: z.number().nonnegative(),
});
