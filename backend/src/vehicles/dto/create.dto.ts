import { createZodDto } from 'nestjs-zod';
import z from 'zod';
import { FuelType, VehicleType } from '../../generated/prisma/enums';

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 1;

export const vehicleFields = z.object({
  imageUrl: z
    .url({ message: 'Image URL must be a valid URL' })
    .max(500)
    .optional(),
  plate: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-Z]{3}\d[A-Z0-9]\d{2}$/, { message: 'Invalid plate' }),
  chassis: z
    .string()
    .trim()
    .toUpperCase()
    .regex(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid chassis' }),
  renavam: z
    .string()
    .trim()
    .regex(/^\d{11}$/, { message: 'Renavam must have 11 digits' }),
  brand: z
    .string()
    .trim()
    .min(1, { message: 'Brand is required' })
    .max(100, { message: 'Brand must be at most 100 characters long' }),
  model: z
    .string()
    .trim()
    .min(1, { message: 'Model is required' })
    .max(100, { message: 'Model must be at most 100 characters long' }),
  manufactureYear: z
    .number()
    .int()
    .min(MIN_YEAR, { message: 'Manufacture year must be a valid year' })
    .max(MAX_YEAR, { message: 'Manufacture year must be a valid year' }),
  modelYear: z
    .number()
    .int()
    .min(MIN_YEAR, { message: 'Model year must be a valid year' })
    .max(MAX_YEAR, { message: 'Model year must be a valid year' }),
  color: z
    .string()
    .trim()
    .min(1, { message: 'Color is required' })
    .max(50, { message: 'Color must be at most 50 characters long' }),
  fuel: z.enum(FuelType, { message: 'Fuel type must be a valid enum value' }),
  type: z.enum(VehicleType, {
    message: 'Vehicle type must be a valid enum value',
  }),
  nickname: z
    .string()
    .trim()
    .max(100, { message: 'Nickname must be at most 100 characters long' })
    .optional(),
});

export function isValidModelYear(data: {
  manufactureYear?: number;
  modelYear?: number;
}) {
  if (data.manufactureYear === undefined || data.modelYear === undefined) {
    return true;
  }

  return (
    data.modelYear === data.manufactureYear ||
    data.modelYear === data.manufactureYear + 1
  );
}

export const MODEL_YEAR_MESSAGE =
  'Model year must be the manufacture year or the next one';

export const createVehicleSchema = vehicleFields.refine(isValidModelYear, {
  message: MODEL_YEAR_MESSAGE,
  path: ['modelYear'],
});

export class CreateVehicleDto extends createZodDto(createVehicleSchema) {}
