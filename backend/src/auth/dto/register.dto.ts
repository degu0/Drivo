import z from 'zod';
import { emailField } from './fields';
import { createZodDto } from 'nestjs-zod';

export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(150, { message: 'Name must be at most 150 characters long' }),
  email: emailField,
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(72, { message: 'Password must be at most 72 characters long' }),
});

export class RegisterDto extends createZodDto(registerSchema) {}
