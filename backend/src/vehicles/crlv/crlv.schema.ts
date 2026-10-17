import { z } from 'zod';
import { FuelType, VehicleType } from '../../generated/prisma/enums';
import { vehicleFields } from '../dto/create.dto';

export const crlvAiResponseSchema = z.object({
  isCrlv: z.boolean(),
  plate: z.string().nullable(),
  chassis: z.string().nullable(),
  renavam: z.string().nullable(),
  brand: z.string().nullable(),
  model: z.string().nullable(),
  manufactureYear: z.number().int().nullable(),
  modelYear: z.number().int().nullable(),
  color: z.string().nullable(),
  fuel: z.enum(FuelType).nullable(),
  type: z.enum(VehicleType).nullable(),
});

export const crlvAiJsonSchema = z.toJSONSchema(crlvAiResponseSchema);

const stripNonAlphanumeric = (value: unknown) =>
  typeof value === 'string' ? value.replace(/[^a-z0-9]/gi, '') : value;

const stripNonDigits = (value: unknown) =>
  typeof value === 'string' ? value.replace(/\D/g, '') : value;

const plateField = z.preprocess(
  stripNonAlphanumeric,
  vehicleFields.shape.plate,
);

const chassisField = z.preprocess(
  stripNonAlphanumeric,
  vehicleFields.shape.chassis,
);

const renavamField = z.preprocess((value) => {
  const digits = stripNonDigits(value);
  return typeof digits === 'string' && digits.length >= 9
    ? digits.padStart(11, '0')
    : digits;
}, vehicleFields.shape.renavam);

const yearField = vehicleFields.shape.manufactureYear;

export const crlvExtractedSchema = z.object({
  isCrlv: z.boolean().catch(false),
  plate: plateField.nullable().catch(null),
  chassis: chassisField.nullable().catch(null),
  renavam: renavamField.nullable().catch(null),
  brand: z.string().trim().min(1).max(100).nullable().catch(null),
  model: z.string().trim().min(1).max(100).nullable().catch(null),
  manufactureYear: yearField.nullable().catch(null),
  modelYear: yearField.nullable().catch(null),
  color: z.string().trim().min(1).max(50).nullable().catch(null),
  fuel: z.enum(FuelType).nullable().catch(null),
  type: z.enum(VehicleType).nullable().catch(null),
});

export type CrlvExtractedData = Omit<
  z.infer<typeof crlvExtractedSchema>,
  'isCrlv'
>;
