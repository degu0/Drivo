import 'server-only';
import { redirect } from 'next/navigation';
import { env } from '@/lib/env';
import { SESSION_EXPIRED_URL } from '@/lib/session';

export const NETWORK_ERROR_STATUS = 0;

export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors: Record<string, string> = {},
  ) {
    super(message);
  }
}

type ApiFetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  token?: string;
};

type ValidationIssue = { path?: (string | number)[]; message?: string };

function toFieldErrors(errors: unknown): Record<string, string> {
  if (!Array.isArray(errors)) return {};

  const fieldErrors: Record<string, string> = {};
  for (const issue of errors as ValidationIssue[]) {
    const field = issue.path?.[0];
    if (typeof field === 'string' && issue.message && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
  }
  return fieldErrors;
}

export async function apiFetch<T>(
  path: string,
  { body, token, headers, ...init }: ApiFetchOptions = {},
): Promise<T> {
  const isFormData = body instanceof FormData;

  let response: Response;
  try {
    response = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
      ...init,
      headers: {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...headers,
      },
      body: isFormData
        ? body
        : body === undefined
          ? undefined
          : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(NETWORK_ERROR_STATUS, 'API unreachable');
  }

  if (response.status === 401 && token) {
    redirect(SESSION_EXPIRED_URL);
  }

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      data?.message ?? response.statusText,
      toFieldErrors(data?.errors),
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
