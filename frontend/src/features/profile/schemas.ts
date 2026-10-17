import { z } from 'zod';

export const profileSchema = z
  .object({
    firstName: z.string().trim().min(1, { message: 'Informe seu nome' }),
    lastName: z.string().trim(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.email({ message: 'Informe um e-mail válido' })),
  })
  .refine(
    (data) => `${data.firstName} ${data.lastName}`.trim().length >= 3,
    {
      message: 'O nome deve ter pelo menos 3 caracteres',
      path: ['firstName'],
    },
  )
  .refine(
    (data) => `${data.firstName} ${data.lastName}`.trim().length <= 150,
    {
      message: 'O nome deve ter no máximo 150 caracteres',
      path: ['firstName'],
    },
  );

export type ProfileInput = z.input<typeof profileSchema>;

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, { message: 'Informe sua senha atual' }),
    password: z
      .string()
      .min(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
      .max(72, { message: 'A senha deve ter no máximo 72 caracteres' })
      .regex(/[a-zA-Z]/, { message: 'A senha deve conter letras' })
      .regex(/\d/, { message: 'A senha deve conter números' }),
    confirmPassword: z.string().min(1, { message: 'Confirme a nova senha' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export type PasswordInput = z.input<typeof passwordSchema>;
