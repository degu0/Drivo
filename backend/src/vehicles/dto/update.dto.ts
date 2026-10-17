import { createZodDto } from 'nestjs-zod';
import {
  isValidModelYear,
  MODEL_YEAR_MESSAGE,
  vehicleFields,
} from './create.dto';

export const updateVehicleSchema = vehicleFields
  .partial()
  .refine(isValidModelYear, {
    message: MODEL_YEAR_MESSAGE,
    path: ['modelYear'],
  });

export class UpdateVehicleDto extends createZodDto(updateVehicleSchema) {}
