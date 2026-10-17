"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVehicleDto = exports.createVehicleSchema = exports.MODEL_YEAR_MESSAGE = exports.vehicleFields = void 0;
exports.isValidModelYear = isValidModelYear;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = __importDefault(require("zod"));
const enums_1 = require("../../generated/prisma/enums");
const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 1;
exports.vehicleFields = zod_1.default.object({
    imageUrl: zod_1.default
        .url({ message: 'Image URL must be a valid URL' })
        .max(500)
        .optional(),
    plate: zod_1.default
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-Z]{3}\d[A-Z0-9]\d{2}$/, { message: 'Invalid plate' }),
    chassis: zod_1.default
        .string()
        .trim()
        .toUpperCase()
        .regex(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid chassis' }),
    renavam: zod_1.default
        .string()
        .trim()
        .regex(/^\d{11}$/, { message: 'Renavam must have 11 digits' }),
    brand: zod_1.default
        .string()
        .trim()
        .min(1, { message: 'Brand is required' })
        .max(100, { message: 'Brand must be at most 100 characters long' }),
    model: zod_1.default
        .string()
        .trim()
        .min(1, { message: 'Model is required' })
        .max(100, { message: 'Model must be at most 100 characters long' }),
    manufactureYear: zod_1.default
        .number()
        .int()
        .min(MIN_YEAR, { message: 'Manufacture year must be a valid year' })
        .max(MAX_YEAR, { message: 'Manufacture year must be a valid year' }),
    modelYear: zod_1.default
        .number()
        .int()
        .min(MIN_YEAR, { message: 'Model year must be a valid year' })
        .max(MAX_YEAR, { message: 'Model year must be a valid year' }),
    color: zod_1.default
        .string()
        .trim()
        .min(1, { message: 'Color is required' })
        .max(50, { message: 'Color must be at most 50 characters long' }),
    fuel: zod_1.default.enum(enums_1.FuelType, { message: 'Fuel type must be a valid enum value' }),
    type: zod_1.default.enum(enums_1.VehicleType, {
        message: 'Vehicle type must be a valid enum value',
    }),
    nickname: zod_1.default
        .string()
        .trim()
        .max(100, { message: 'Nickname must be at most 100 characters long' })
        .optional(),
});
function isValidModelYear(data) {
    if (data.manufactureYear === undefined || data.modelYear === undefined) {
        return true;
    }
    return (data.modelYear === data.manufactureYear ||
        data.modelYear === data.manufactureYear + 1);
}
exports.MODEL_YEAR_MESSAGE = 'Model year must be the manufacture year or the next one';
exports.createVehicleSchema = exports.vehicleFields.refine(isValidModelYear, {
    message: exports.MODEL_YEAR_MESSAGE,
    path: ['modelYear'],
});
class CreateVehicleDto extends (0, nestjs_zod_1.createZodDto)(exports.createVehicleSchema) {
}
exports.CreateVehicleDto = CreateVehicleDto;
//# sourceMappingURL=create.dto.js.map