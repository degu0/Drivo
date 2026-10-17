import 'server-only';
import { redirect, unstable_rethrow } from 'next/navigation';
import { ApiError, apiFetch } from '@/lib/api';
import { requireSessionToken, SESSION_EXPIRED_URL } from '@/lib/session';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getCurrentUser(): Promise<User> {
  'use cache: private';

  const token = await requireSessionToken();

  try {
    const user = await apiFetch<User>('/users/me', { token });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof ApiError && error.status === 404) {
      redirect(SESSION_EXPIRED_URL);
    }
    throw error;
  }
}
