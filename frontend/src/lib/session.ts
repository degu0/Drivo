import 'server-only';
import { cookies } from 'next/headers';

export const SESSION_COOKIE = 'drivo_session';

export function getTokenExpiration(token: string): Date | undefined {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64url').toString(),
    );
    return typeof payload.exp === 'number'
      ? new Date(payload.exp * 1000)
      : undefined;
  } catch {
    return undefined;
  }
}

export async function getSessionToken() {
  return (await cookies()).get(SESSION_COOKIE)?.value;
}

export async function createSession(token: string) {
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: getTokenExpiration(token),
  });
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE);
}
