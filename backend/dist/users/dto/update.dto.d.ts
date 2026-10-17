import z from 'zod';
export declare const updateUserSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodEmail>>;
}, z.core.$strip>;
export declare const updatePasswordSchema: z.ZodObject<{
    password: z.ZodString;
}, z.core.$strip>;
declare const UpdateUserDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodEmail>>;
}, z.core.$strip>, false>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
declare const UpdatePasswordDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    password: z.ZodString;
}, z.core.$strip>, false>;
export declare class UpdatePasswordDto extends UpdatePasswordDto_base {
}
export {};
