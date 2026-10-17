import { z } from 'zod';
import type { FuelType, Vehicle, VehicleType } from './api';
import { fuelLabel, vehicleTypeLabel } from './labels';

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 1;

export const FUEL_TYPES = Object.keys(fuelLabel) as [FuelType, ...FuelType[]];
export const VEHICLE_TYPES = Object.keys(vehicleTypeLabel) as [
  VehicleType,
  ...VehicleType[],
];

const alphanumeric = (value: string) => value.replace(/[^A-Z0-9]/g, '');

const yearField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, { message: `Informe o ${label}` })
    .regex(/^\d{4}$/, { message: 'Ano inválido' })
    .transform(Number)
    .pipe(
      z
        .number()
        .min(MIN_YEAR, { message: 'Ano inválido' })
        .max(MAX_YEAR, { message: 'Ano inválido' }),
    );

export const vehicleSchema = z
  .object({
    plate: z
      .string()
      .trim()
      .min(1, { message: 'Informe a placa' })
      .toUpperCase()
      .transform(alphanumeric)
      .pipe(
        z
          .string()
          .regex(/^[A-Z]{3}\d[A-Z0-9]\d{2}$/, { message: 'Placa inválida' }),
      ),
    renavam: z
      .string()
      .trim()
      .min(1, { message: 'Informe o Renavam' })
      .regex(/^\d{11}$/, { message: 'O Renavam tem 11 dígitos' }),
    chassis: z
      .string()
      .trim()
      .min(1, { message: 'Informe o chassi' })
      .toUpperCase()
      .transform(alphanumeric)
      .pipe(
        z.string().regex(/^[A-HJ-NPR-Z0-9]{17}$/, {
          message: 'O chassi tem 17 caracteres (sem I, O e Q)',
        }),
      ),
    brand: z
      .string()
      .trim()
      .min(1, { message: 'Informe a marca' })
      .max(100, { message: 'Máximo de 100 caracteres' }),
    model: z
      .string()
      .trim()
      .min(1, { message: 'Informe o modelo' })
      .max(100, { message: 'Máximo de 100 caracteres' }),
    manufactureYear: yearField('ano de fabricação'),
    modelYear: yearField('ano do modelo'),
    color: z
      .string()
      .trim()
      .min(1, { message: 'Informe a cor' })
      .max(50, { message: 'Máximo de 50 caracteres' }),
    fuel: z
      .string()
      .pipe(z.enum(FUEL_TYPES, { message: 'Selecione o combustível' })),
    type: z
      .string()
      .pipe(z.enum(VEHICLE_TYPES, { message: 'Selecione o tipo' })),
    nickname: z
      .string()
      .trim()
      .max(100, { message: 'Máximo de 100 caracteres' }),
  })
  .refine(
    (data) =>
      data.modelYear === data.manufactureYear ||
      data.modelYear === data.manufactureYear + 1,
    {
      message: 'Deve ser o ano de fabricação ou o seguinte',
      path: ['modelYear'],
    },
  );

export type VehicleInput = z.input<typeof vehicleSchema>;
export type VehicleOutput = z.output<typeof vehicleSchema>;

export const emptyVehicleInput: VehicleInput = {
  plate: '',
  renavam: '',
  chassis: '',
  brand: '',
  model: '',
  manufactureYear: '',
  modelYear: '',
  color: '',
  fuel: '',
  type: '',
  nickname: '',
};

export function toVehicleInput(vehicle: Vehicle): VehicleInput {
  return {
    plate: vehicle.plate,
    renavam: vehicle.renavam,
    chassis: vehicle.chassis,
    brand: vehicle.brand,
    model: vehicle.model,
    manufactureYear: String(vehicle.manufactureYear),
    modelYear: String(vehicle.modelYear),
    color: vehicle.color,
    fuel: vehicle.fuel,
    type: vehicle.type,
    nickname: vehicle.nickname ?? '',
  };
}

export type CrlvData = {
  [K in Exclude<keyof VehicleInput, 'nickname'>]: string | number | null;
};
