"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crlvExtractedSchema = exports.crlvAiJsonSchema = exports.crlvAiResponseSchema = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../generated/prisma/enums");
const create_dto_1 = require("../dto/create.dto");
exports.crlvAiResponseSchema = zod_1.z.object({
    isCrlv: zod_1.z.boolean(),
    plate: zod_1.z.string().nullable(),
    chassis: zod_1.z.string().nullable(),
    renavam: zod_1.z.string().nullable(),
    brand: zod_1.z.string().nullable(),
    model: zod_1.z.string().nullable(),
    manufactureYear: zod_1.z.number().int().nullable(),
    modelYear: zod_1.z.number().int().nullable(),
    color: zod_1.z.string().nullable(),
    fuel: zod_1.z.enum(enums_1.FuelType).nullable(),
    type: zod_1.z.enum(enums_1.VehicleType).nullable(),
});
exports.crlvAiJsonSchema = zod_1.z.toJSONSchema(exports.crlvAiResponseSchema);
const stripNonAlphanumeric = (value) => typeof value === 'string' ? value.replace(/[^a-z0-9]/gi, '') : value;
const stripNonDigits = (value) => typeof value === 'string' ? value.replace(/\D/g, '') : value;
const plateField = zod_1.z.preprocess(stripNonAlphanumeric, create_dto_1.vehicleFields.shape.plate);
const chassisField = zod_1.z.preprocess(stripNonAlphanumeric, create_dto_1.vehicleFields.shape.chassis);
const renavamField = zod_1.z.preprocess((value) => {
    const digits = stripNonDigits(value);
    return typeof digits === 'string' && digits.length >= 9
        ? digits.padStart(11, '0')
        : digits;
}, create_dto_1.vehicleFields.shape.renavam);
const yearField = create_dto_1.vehicleFields.shape.manufactureYear;
exports.crlvExtractedSchema = zod_1.z.object({
    isCrlv: zod_1.z.boolean().catch(false),
    plate: plateField.nullable().catch(null),
    chassis: chassisField.nullable().catch(null),
    renavam: renavamField.nullable().catch(null),
    brand: zod_1.z.string().trim().min(1).max(100).nullable().catch(null),
    model: zod_1.z.string().trim().min(1).max(100).nullable().catch(null),
    manufactureYear: yearField.nullable().catch(null),
    modelYear: yearField.nullable().catch(null),
    color: zod_1.z.string().trim().min(1).max(50).nullable().catch(null),
    fuel: zod_1.z.enum(enums_1.FuelType).nullable().catch(null),
    type: zod_1.z.enum(enums_1.VehicleType).nullable().catch(null),
});
//# sourceMappingURL=crlv.schema.js.map