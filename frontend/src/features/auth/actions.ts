'use server';

import { redirect } from 'next/navigation';
import type { ActionError } from '@/lib/action-result';
import { apiFetch } from '@/lib/api';
import { toActionError } from '@/lib/api-error';
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

const INVALID_CREDENTIALS = 'E-mail ou senha incorretos';

export async function login(
  input: LoginInput,
): Promise<ActionError | undefined> {
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
    const { error: message } = toActionError(error, {
      messages: {
        400: INVALID_CREDENTIALS,
        401: INVALID_CREDENTIALS,
        404: INVALID_CREDENTIALS,
        409: INVALID_CREDENTIALS,
      },
    });
    return { error: message };
  }

  redirect('/');
}

export async function register(
  input: RegisterInput,
): Promise<ActionError | undefined> {
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
    return toActionError(error, {
      messages: {
        409: { field: 'email', message: 'Já existe uma conta com este e-mail' },
      },
    });
  }

  redirect('/');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
