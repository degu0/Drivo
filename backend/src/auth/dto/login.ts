import z from "zod";
import { emailField } from "./fields";
import { createZodDto } from "nestjs-zod";

export const loginSchema = z.object({
    email: emailField,
    password: z.string().min(1, { message: 'Password is required' })
})

export class LoginDto extends createZodDto(loginSchema) {}