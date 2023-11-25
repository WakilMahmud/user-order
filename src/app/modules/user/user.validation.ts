import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).toLowerCase(),
  lastName: z.string().trim().min(1).toLowerCase(),
});

const addressValidationSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});

const userValidationSchema = z.object({
  userId: z.number().positive(),
  username: z.string().trim().min(1).max(20).toLowerCase(),
  password: z.string().min(6).max(20),
  fullName: fullNameValidationSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressValidationSchema,
});

export default userValidationSchema;
