"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleDto = exports.updateVehicleSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const create_dto_1 = require("./create.dto");
exports.updateVehicleSchema = create_dto_1.vehicleFields
    .partial()
    .refine(create_dto_1.isValidModelYear, {
    message: create_dto_1.MODEL_YEAR_MESSAGE,
    path: ['modelYear'],
});
class UpdateVehicleDto extends (0, nestjs_zod_1.createZodDto)(exports.updateVehicleSchema) {
}
exports.UpdateVehicleDto = UpdateVehicleDto;
//# sourceMappingURL=update.dto.js.map