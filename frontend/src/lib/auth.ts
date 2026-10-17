import 'server-only';
import { redirect } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { getSessionToken } from '@/lib/session';

export type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export async function getCurrentUser(): Promise<User> {
  'use cache: private';

  const token = await getSessionToken();
  if (!token) {
    redirect('/login');
  }

  try {
    const user = await apiFetch<User>('/users/me', { token });
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  } catch {
    redirect('/login');
  }
}
