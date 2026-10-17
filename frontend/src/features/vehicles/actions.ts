'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ApiError, apiFetch } from '@/lib/api';
import { getSessionToken } from '@/lib/session';
import type { Vehicle } from './api';
import { vehicleSchema, type CrlvData, type VehicleInput } from './schemas';

export type VehicleActionResult = { error: string } | { success: string };
export type CrlvScanResult = { error: string } | { data: CrlvData };

async function requireToken() {
  const token = await getSessionToken();
  if (!token) {
    redirect('/login');
  }
  return token;
}

function saveErrorMessage(error: unknown) {
  if (error instanceof ApiError && error.status === 401) {
    redirect('/login');
  }
  if (error instanceof ApiError && error.status === 409) {
    return 'Já existe um veículo com esta placa, chassi ou Renavam';
  }
  if (error instanceof ApiError && error.status < 500) {
    return 'Dados inválidos';
  }
  return 'Não foi possível salvar agora. Tente novamente.';
}

export async function createVehicle(
  input: VehicleInput,
): Promise<VehicleActionResult> {
  const parsed = vehicleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const { nickname, ...data } = parsed.data;
  const token = await requireToken();

  try {
    await apiFetch<Vehicle>('/vehicles', {
      method: 'POST',
      token,
      body: { ...data, ...(nickname && { nickname }) },
    });
  } catch (error) {
    return { error: saveErrorMessage(error) };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function updateVehicle(
  id: string,
  input: VehicleInput,
): Promise<VehicleActionResult> {
  const parsed = vehicleSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Dados inválidos' };
  }

  const token = await requireToken();

  try {
    await apiFetch<Vehicle>(`/vehicles/${id}`, {
      method: 'PATCH',
      token,
      body: parsed.data,
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      redirect('/');
    }
    return { error: saveErrorMessage(error) };
  }

  revalidatePath('/', 'layout');
  return { success: 'Alterações salvas' };
}

export async function deleteVehicle(id: string): Promise<{ error: string }> {
  const token = await requireToken();

  try {
    await apiFetch(`/vehicles/${id}`, { method: 'DELETE', token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect('/login');
    }
    // 404: já foi excluído; segue para a garagem.
    if (!(error instanceof ApiError && error.status === 404)) {
      return { error: 'Não foi possível excluir agora. Tente novamente.' };
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

  const token = await requireToken();
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
    if (error instanceof ApiError) {
      switch (error.status) {
        case 401:
          redirect('/login');
        case 400:
          return { error: 'Envie um PDF, JPG ou PNG de até 5 MB' };
        case 422:
          return { error: 'Este arquivo não parece ser um CRLV' };
        case 429:
          return { error: 'Limite de leituras atingido. Tente mais tarde.' };
      }
    }
    return { error: 'Não foi possível ler o CRLV agora. Tente novamente.' };
  }
}
