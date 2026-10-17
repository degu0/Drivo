"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePasswordDto = exports.UpdateUserDto = exports.updatePasswordSchema = exports.updateUserSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const fields_1 = require("../../auth/dto/fields");
const zod_1 = __importDefault(require("zod"));
exports.updateUserSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .trim()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(150, { message: 'Name must be at most 150 characters long' })
        .optional(),
    email: fields_1.emailField.optional(),
});
exports.updatePasswordSchema = zod_1.default.object({
    password: zod_1.default
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(72, { message: 'Password must be at most 72 characters long' }),
});
class UpdateUserDto extends (0, nestjs_zod_1.createZodDto)(exports.updateUserSchema) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdatePasswordDto extends (0, nestjs_zod_1.createZodDto)(exports.updatePasswordSchema) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
//# sourceMappingURL=update.dto.js.map