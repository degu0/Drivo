import 'server-only';
import { redirect } from 'next/navigation';
import { apiFetch, ApiError } from '@/lib/api';
import { getSessionToken } from '@/lib/session';

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

  const token = await getSessionToken();
  if (!token) {
    redirect('/login');
  }

  try {
    return await apiFetch<Vehicle[]>('/vehicles', { token });
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) {
      redirect('/login');
    }
    throw error;
  }
}
