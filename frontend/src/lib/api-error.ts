import 'server-only';
import { unstable_rethrow } from 'next/navigation';
import type { ActionError } from '@/lib/action-result';
import { ApiError, NETWORK_ERROR_STATUS } from '@/lib/api';

const STATUS_MESSAGES: Record<number, string> = {
  [NETWORK_ERROR_STATUS]:
    'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.',
  400: 'Alguns dados estão inválidos. Revise os campos destacados.',
  404: 'Não encontramos o que você procurava. Ele pode ter sido removido.',
  409: 'Esses dados já estão em uso.',
  422: 'Não foi possível processar os dados enviados.',
  429: 'Muitas tentativas em pouco tempo. Aguarde um pouco e tente novamente.',
};

const SERVER_ERROR_MESSAGE =
  'O servidor está instável no momento. Tente novamente em instantes.';
const UNKNOWN_ERROR_MESSAGE = 'Algo deu errado. Tente novamente.';
const FIELDS_ERROR_MESSAGE = 'Revise os campos destacados.';

const FIELD_MESSAGES: Record<string, string> = {
  'Invalid plate': 'Placa inválida',
  'Invalid chassis': 'O chassi tem 17 caracteres (sem I, O e Q)',
  'Renavam must have 11 digits': 'O Renavam tem 11 dígitos',
  'Model year must be the manufacture year or the next one':
    'Deve ser o ano de fabricação ou o seguinte',
  'Invalid email address': 'Informe um e-mail válido',
};
const FIELD_FALLBACK_MESSAGE = 'Valor inválido';

type StatusOverride = string | { field: string; message: string };

type ToActionErrorOptions = {
  messages?: Partial<Record<number, StatusOverride>>;
  fieldMap?: Record<string, string>;
};

function statusMessage(status: number) {
  if (status in STATUS_MESSAGES) return STATUS_MESSAGES[status];
  if (status >= 500) return SERVER_ERROR_MESSAGE;
  return UNKNOWN_ERROR_MESSAGE;
}

export function toActionError(
  error: unknown,
  { messages = {}, fieldMap = {} }: ToActionErrorOptions = {},
): ActionError {
  unstable_rethrow(error);

  if (!(error instanceof ApiError)) {
    return { error: UNKNOWN_ERROR_MESSAGE };
  }

  const override = messages[error.status];
  if (typeof override === 'object') {
    return {
      error: FIELDS_ERROR_MESSAGE,
      fieldErrors: { [override.field]: override.message },
    };
  }

  const fieldErrors = Object.fromEntries(
    Object.entries(error.fieldErrors).map(([field, message]) => [
      fieldMap[field] ?? field,
      FIELD_MESSAGES[message] ?? FIELD_FALLBACK_MESSAGE,
    ]),
  );
  const hasFieldErrors = Object.keys(fieldErrors).length > 0;

  return {
    error: override ?? statusMessage(error.status),
    ...(hasFieldErrors && { fieldErrors }),
  };
}
