import 'server-only';
import { notFound, unstable_rethrow } from 'next/navigation';
import { apiFetch, ApiError } from '@/lib/api';
import { requireSessionToken } from '@/lib/session';

export type FuelType =
  | 'GASOLINA'
  | 'ETANOL'
  | 'FLEX'
  | 'DIESEL'
  | 'GNV'
  | 'ELETRICO'
  | 'HIBRIDO';

export type VehicleType =
  | 'CARRO'
  | 'MOTO'
  | 'CAMINHONETE'
  | 'CAMINHAO'
  | 'ONIBUS'
  | 'OUTRO';

export type Vehicle = {
  id: string;
  imageUrl: string | null;
  plate: string;
  chassis: string;
  renavam: string;
  brand: string;
  model: string;
  manufactureYear: number;
  modelYear: number;
  color: string;
  fuel: FuelType;
  type: VehicleType;
  nickname: string | null;
  createdAt: string;
  updatedAt: string;
};

export async function getVehicles(): Promise<Vehicle[]> {
  'use cache: private';

  const token = await requireSessionToken();
  return apiFetch<Vehicle[]>('/vehicles', { token });
}

export async function getVehicle(id: string): Promise<Vehicle> {
  'use cache: private';

  const token = await requireSessionToken();

  try {
    return await apiFetch<Vehicle>(`/vehicles/${id}`, { token });
  } catch (error) {
    unstable_rethrow(error);
    if (
      error instanceof ApiError &&
      (error.status === 400 || error.status === 404)
    ) {
      notFound();
    }
    throw error;
  }
}
