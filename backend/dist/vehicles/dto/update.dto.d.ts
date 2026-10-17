export declare const updateVehicleSchema: import("zod").ZodObject<{
    imageUrl: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodURL>>;
    plate: import("zod").ZodOptional<import("zod").ZodString>;
    chassis: import("zod").ZodOptional<import("zod").ZodString>;
    renavam: import("zod").ZodOptional<import("zod").ZodString>;
    brand: import("zod").ZodOptional<import("zod").ZodString>;
    model: import("zod").ZodOptional<import("zod").ZodString>;
    manufactureYear: import("zod").ZodOptional<import("zod").ZodNumber>;
    modelYear: import("zod").ZodOptional<import("zod").ZodNumber>;
    color: import("zod").ZodOptional<import("zod").ZodString>;
    fuel: import("zod").ZodOptional<import("zod").ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>>;
    type: import("zod").ZodOptional<import("zod").ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>>;
    nickname: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
}, import("zod/v4/core").$strip>;
declare const UpdateVehicleDto_base: import("nestjs-zod").ZodDto<import("zod").ZodObject<{
    imageUrl: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodURL>>;
    plate: import("zod").ZodOptional<import("zod").ZodString>;
    chassis: import("zod").ZodOptional<import("zod").ZodString>;
    renavam: import("zod").ZodOptional<import("zod").ZodString>;
    brand: import("zod").ZodOptional<import("zod").ZodString>;
    model: import("zod").ZodOptional<import("zod").ZodString>;
    manufactureYear: import("zod").ZodOptional<import("zod").ZodNumber>;
    modelYear: import("zod").ZodOptional<import("zod").ZodNumber>;
    color: import("zod").ZodOptional<import("zod").ZodString>;
    fuel: import("zod").ZodOptional<import("zod").ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>>;
    type: import("zod").ZodOptional<import("zod").ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>>;
    nickname: import("zod").ZodOptional<import("zod").ZodOptional<import("zod").ZodString>>;
}, import("zod/v4/core").$strip>, false>;
export declare class UpdateVehicleDto extends UpdateVehicleDto_base {
}
export {};
