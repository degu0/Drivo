'use server';

import { redirect } from 'next/navigation';
import { ApiError, apiFetch } from '@/lib/api';
import { createSession, deleteSession } from '@/lib/session';
import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from './schemas';

type AuthResponse = {
  accessToken: string;
};

export type LoginResult = { error: string } | undefined;

export async function login(input: LoginInput): Promise<LoginResult> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados de login inválidos' };
  }

  try {
    const { accessToken } = await apiFetch<AuthResponse>('/auth/login', {
      method: 'POST',
      body: parsed.data,
    });
    await createSession(accessToken);
  } catch (error) {
    if (error instanceof ApiError && error.status < 500) {
      return { error: 'E-mail ou senha incorretos' };
    }
    return { error: 'Não foi possível entrar agora. Tente novamente.' };
  }

  redirect('/');
}

export type RegisterResult = { error: string } | undefined;

export async function register(input: RegisterInput): Promise<RegisterResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados de cadastro inválidos' };
  }

  const { name, email, password } = parsed.data;

  try {
    const { accessToken } = await apiFetch<AuthResponse>('/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    await createSession(accessToken);
  } catch (error) {
    if (error instanceof ApiError && error.status === 409) {
      return { error: 'Já existe uma conta com este e-mail' };
    }
    if (error instanceof ApiError && error.status < 500) {
      return { error: 'Dados de cadastro inválidos' };
    }
    return { error: 'Não foi possível criar sua conta agora. Tente novamente.' };
  }

  redirect('/');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
