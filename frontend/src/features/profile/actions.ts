'use server';

import { revalidatePath } from 'next/cache';
import type { ActionResult } from '@/lib/action-result';
import { apiFetch } from '@/lib/api';
import { toActionError } from '@/lib/api-error';
import { requireSessionToken } from '@/lib/session';
import {
  passwordSchema,
  profileSchema,
  type PasswordInput,
  type ProfileInput,
} from './schemas';

export async function updateProfile(
  input: ProfileInput,
): Promise<ActionResult> {
  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const { firstName, lastName, email } = parsed.data;
  const token = await requireSessionToken();

  try {
    await apiFetch('/users/me', {
      method: 'PATCH',
      token,
      body: { name: `${firstName} ${lastName}`.trim(), email },
    });
  } catch (error) {
    return toActionError(error, {
      messages: {
        409: { field: 'email', message: 'Este e-mail já está em uso' },
      },
      fieldMap: { name: 'firstName' },
    });
  }

  revalidatePath('/', 'layout');
  return { success: 'Alterações salvas' };
}

export async function updatePassword(
  input: PasswordInput,
): Promise<ActionResult> {
  const parsed = passwordSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const { currentPassword, password } = parsed.data;
  const token = await requireSessionToken();

  try {
    await apiFetch('/users/me/password', {
      method: 'PATCH',
      token,
      body: { currentPassword, password },
    });
  } catch (error) {
    return toActionError(error, {
      messages: {
        400: { field: 'currentPassword', message: 'Senha atual incorreta' },
      },
    });
  }

  return { success: 'Senha alterada' };
}
