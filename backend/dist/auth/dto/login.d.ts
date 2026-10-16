import z from "zod";
export declare const loginSchema: z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    password: z.ZodString;
}, z.core.$strip>;
declare const LoginDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    email: z.ZodPipe<z.ZodString, z.ZodEmail>;
    password: z.ZodString;
}, z.core.$strip>, false>;
export declare class LoginDto extends LoginDto_base {
}
export {};
