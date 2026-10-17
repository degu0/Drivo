"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginDto = exports.loginSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const fields_1 = require("./fields");
const nestjs_zod_1 = require("nestjs-zod");
exports.loginSchema = zod_1.default.object({
    email: fields_1.emailField,
    password: zod_1.default.string().min(1, { message: 'Password is required' })
});
class LoginDto extends (0, nestjs_zod_1.createZodDto)(exports.loginSchema) {
}
exports.LoginDto = LoginDto;
//# sourceMappingURL=login.js.map