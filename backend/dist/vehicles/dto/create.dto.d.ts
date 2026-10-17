import z from 'zod';
export declare const vehicleFields: z.ZodObject<{
    imageUrl: z.ZodOptional<z.ZodURL>;
    plate: z.ZodString;
    chassis: z.ZodString;
    renavam: z.ZodString;
    brand: z.ZodString;
    model: z.ZodString;
    manufactureYear: z.ZodNumber;
    modelYear: z.ZodNumber;
    color: z.ZodString;
    fuel: z.ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>;
    type: z.ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>;
    nickname: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare function isValidModelYear(data: {
    manufactureYear?: number;
    modelYear?: number;
}): boolean;
export declare const MODEL_YEAR_MESSAGE = "Model year must be the manufacture year or the next one";
export declare const createVehicleSchema: z.ZodObject<{
    imageUrl: z.ZodOptional<z.ZodURL>;
    plate: z.ZodString;
    chassis: z.ZodString;
    renavam: z.ZodString;
    brand: z.ZodString;
    model: z.ZodString;
    manufactureYear: z.ZodNumber;
    modelYear: z.ZodNumber;
    color: z.ZodString;
    fuel: z.ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>;
    type: z.ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>;
    nickname: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const CreateVehicleDto_base: import("nestjs-zod").ZodDto<z.ZodObject<{
    imageUrl: z.ZodOptional<z.ZodURL>;
    plate: z.ZodString;
    chassis: z.ZodString;
    renavam: z.ZodString;
    brand: z.ZodString;
    model: z.ZodString;
    manufactureYear: z.ZodNumber;
    modelYear: z.ZodNumber;
    color: z.ZodString;
    fuel: z.ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>;
    type: z.ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>;
    nickname: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, false>;
export declare class CreateVehicleDto extends CreateVehicleDto_base {
}
export {};
