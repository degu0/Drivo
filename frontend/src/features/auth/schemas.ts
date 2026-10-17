import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email({ message: 'Informe um e-mail válido' })),
  password: z.string().min(1, { message: 'Informe sua senha' }),
});

export type LoginInput = z.input<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
      .max(150, { message: 'O nome deve ter no máximo 150 caracteres' }),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email({ message: 'Informe um e-mail válido' })),
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
      .max(72, { message: 'A senha deve ter no máximo 72 caracteres' }),
    confirmPassword: z.string().min(1, { message: 'Confirme sua senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type RegisterInput = z.input<typeof registerSchema>;
