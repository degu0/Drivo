import { createZodDto } from 'nestjs-zod';
import { emailField } from 'src/auth/dto/fields';
import z from 'zod';

export const updateUserSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters long' })
    .max(150, { message: 'Name must be at most 150 characters long' })
    .optional(),
  email: emailField.optional(),
});

export const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: 'Current password is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(72, { message: 'Password must be at most 72 characters long' }),
});

export class UpdateUserDto extends createZodDto(updateUserSchema) {}
export class UpdatePasswordDto extends createZodDto(updatePasswordSchema) {}