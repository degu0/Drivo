'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { ActionError, ActionResult } from '@/lib/action-result';
import { ApiError, apiFetch } from '@/lib/api';
import { toActionError } from '@/lib/api-error';
import { requireSessionToken } from '@/lib/session';
import type { Vehicle } from './api';
import { vehicleSchema, type CrlvData, type VehicleInput } from './schemas';

export type CrlvScanResult = ActionError | { data: CrlvData };

const VEHICLE_MESSAGES = {
  409: 'Já existe um veículo com esta placa, chassi ou Renavam',
  404: 'Este veículo não existe mais. Ele pode ter sido excluído.',
};

export async function createVehicle(
  input: VehicleInput,
): Promise<ActionResult> {
  const parsed = vehicleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const { nickname, ...data } = parsed.data;
  const token = await requireSessionToken();

  try {
    await apiFetch<Vehicle>('/vehicles', {
      method: 'POST',
      token,
      body: { ...data, ...(nickname && { nickname }) },
    });
  } catch (error) {
    return toActionError(error, { messages: VEHICLE_MESSAGES });
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function updateVehicle(
  id: string,
  input: VehicleInput,
): Promise<ActionResult> {
  const parsed = vehicleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const token = await requireSessionToken();

  try {
    await apiFetch<Vehicle>(`/vehicles/${id}`, {
      method: 'PATCH',
      token,
      body: parsed.data,
    });
  } catch (error) {
    return toActionError(error, { messages: VEHICLE_MESSAGES });
  }

  revalidatePath('/', 'layout');
  return { success: 'Alterações salvas' };
}

export async function deleteVehicle(id: string): Promise<ActionError> {
  const token = await requireSessionToken();

  try {
    await apiFetch(`/vehicles/${id}`, { method: 'DELETE', token });
  } catch (error) {
    if (!(error instanceof ApiError && error.status === 404)) {
      return toActionError(error, {
        messages: { 500: 'Não foi possível excluir agora. Tente novamente.' },
      });
    }
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function scanCrlv(formData: FormData): Promise<CrlvScanResult> {
  const file = formData.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Selecione um arquivo' };
  }

  const token = await requireSessionToken();
  const body = new FormData();
  body.append('file', file);

  try {
    const data = await apiFetch<CrlvData>('/vehicles/crlv/scan', {
      method: 'POST',
      token,
      body,
    });
    return { data };
  } catch (error) {
    const { error: message } = toActionError(error, {
      messages: {
        400: 'Envie um PDF, JPG ou PNG de até 5 MB.',
        422: 'Este arquivo não parece ser um CRLV. Envie uma foto nítida ou o PDF do documento.',
        429: 'O limite de leituras foi atingido. Tente mais tarde ou preencha manualmente.',
        502: 'O serviço de leitura está indisponível. Tente mais tarde ou preencha manualmente.',
      },
    });
    return { error: message };
  }
}
