import { z } from 'zod';

const fullNameValidationSchema = z.object({
  firstName: z.string().trim().min(1).toLowerCase(),
  lastName: z.string().trim().min(1).toLowerCase(),
});

const addressValidationSchema = z.object({
  street: z.string().trim().toLowerCase(),
  city: z.string().trim().toLowerCase(),
  country: z.string().trim().toLowerCase(),
});

const userValidationSchema = z.object({
  userId: z
    .number({
      invalid_type_error: 'userId must be a number',
    })
    .positive({ message: 'userId should be positive number' }),
  username: z
    .string()
    .trim()
    .min(1, { message: 'username cannot be empty string' })
    .max(20, { message: 'Must be 20 or fewer characters long' })
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: 'Must be 6 or more characters long' })
    .max(20, { message: 'Must be 20 or fewer characters long' }),
  fullName: fullNameValidationSchema,
  age: z.number().positive({ message: 'age should be positive number' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Invalid email address' })
    .toLowerCase(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: addressValidationSchema,
});

export default userValidationSchema;
