"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterDto = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fields_1 = require("./fields");
const nestjs_zod_1 = require("nestjs-zod");
exports.registerSchema = zod_1.default.object({
    name: zod_1.default
        .string()
        .trim()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(150, { message: 'Name must be at most 150 characters long' }),
    email: fields_1.emailField,
    password: zod_1.default
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(72, { message: 'Password must be at most 72 characters long' }),
});
class RegisterDto extends (0, nestjs_zod_1.createZodDto)(exports.registerSchema) {
}
exports.RegisterDto = RegisterDto;
//# sourceMappingURL=register.dto.js.map