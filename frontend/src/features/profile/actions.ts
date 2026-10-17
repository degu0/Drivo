'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ApiError, apiFetch } from '@/lib/api';
import { getSessionToken } from '@/lib/session';
import {
  passwordSchema,
  profileSchema,
  type PasswordInput,
  type ProfileInput,
} from './schemas';

export type ProfileActionResult = { error: string } | { success: string };

async function requireToken() {
  const token = await getSessionToken();
  if (!token) {
    redirect('/login');
  }
  return token;
}

export async function updateProfile(
  input: ProfileInput,
): Promise<ProfileActionResult> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const { firstName, lastName, email } = parsed.data;
  const token = await requireToken();

  try {
    await apiFetch('/users/me', {
      method: 'PATCH',
      token,
      body: { name: `${firstName} ${lastName}`.trim(), email },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect('/login');
    }
    if (error instanceof ApiError && error.status === 409) {
      return { error: 'Este e-mail já está em uso' };
    }
    if (error instanceof ApiError && error.status < 500) {
      return { error: 'Dados inválidos' };
    }
    return { error: 'Não foi possível salvar agora. Tente novamente.' };
  }

  revalidatePath('/', 'layout');
  return { success: 'Alterações salvas' };
}

export async function updatePassword(
  input: PasswordInput,
): Promise<ProfileActionResult> {
  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const { currentPassword, password } = parsed.data;
  const token = await requireToken();

  try {
    await apiFetch('/users/me/password', {
      method: 'PATCH',
      token,
      body: { currentPassword, password },
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect('/login');
    }
    if (error instanceof ApiError && error.status === 400) {
      return { error: 'Senha atual incorreta' };
    }
    return { error: 'Não foi possível alterar a senha. Tente novamente.' };
  }

  return { success: 'Senha alterada' };
}
