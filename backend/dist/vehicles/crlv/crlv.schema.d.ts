import { z } from 'zod';
export declare const crlvAiResponseSchema: z.ZodObject<{
    isCrlv: z.ZodBoolean;
    plate: z.ZodNullable<z.ZodString>;
    chassis: z.ZodNullable<z.ZodString>;
    renavam: z.ZodNullable<z.ZodString>;
    brand: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    manufactureYear: z.ZodNullable<z.ZodNumber>;
    modelYear: z.ZodNullable<z.ZodNumber>;
    color: z.ZodNullable<z.ZodString>;
    fuel: z.ZodNullable<z.ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>>;
    type: z.ZodNullable<z.ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>>;
}, z.core.$strip>;
export declare const crlvAiJsonSchema: z.core.ZodStandardJSONSchemaPayload<z.ZodObject<{
    isCrlv: z.ZodBoolean;
    plate: z.ZodNullable<z.ZodString>;
    chassis: z.ZodNullable<z.ZodString>;
    renavam: z.ZodNullable<z.ZodString>;
    brand: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    manufactureYear: z.ZodNullable<z.ZodNumber>;
    modelYear: z.ZodNullable<z.ZodNumber>;
    color: z.ZodNullable<z.ZodString>;
    fuel: z.ZodNullable<z.ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>>;
    type: z.ZodNullable<z.ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>>;
}, z.core.$strip>>;
export declare const crlvExtractedSchema: z.ZodObject<{
    isCrlv: z.ZodCatch<z.ZodBoolean>;
    plate: z.ZodCatch<z.ZodNullable<z.ZodPreprocess<z.ZodString, unknown>>>;
    chassis: z.ZodCatch<z.ZodNullable<z.ZodPreprocess<z.ZodString, unknown>>>;
    renavam: z.ZodCatch<z.ZodNullable<z.ZodPreprocess<z.ZodString, unknown>>>;
    brand: z.ZodCatch<z.ZodNullable<z.ZodString>>;
    model: z.ZodCatch<z.ZodNullable<z.ZodString>>;
    manufactureYear: z.ZodCatch<z.ZodNullable<z.ZodNumber>>;
    modelYear: z.ZodCatch<z.ZodNullable<z.ZodNumber>>;
    color: z.ZodCatch<z.ZodNullable<z.ZodString>>;
    fuel: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
        readonly GASOLINA: "GASOLINA";
        readonly ETANOL: "ETANOL";
        readonly FLEX: "FLEX";
        readonly DIESEL: "DIESEL";
        readonly GNV: "GNV";
        readonly ELETRICO: "ELETRICO";
        readonly HIBRIDO: "HIBRIDO";
    }>>>;
    type: z.ZodCatch<z.ZodNullable<z.ZodEnum<{
        readonly CARRO: "CARRO";
        readonly MOTO: "MOTO";
        readonly CAMINHONETE: "CAMINHONETE";
        readonly CAMINHAO: "CAMINHAO";
        readonly ONIBUS: "ONIBUS";
        readonly OUTRO: "OUTRO";
    }>>>;
}, z.core.$strip>;
export type CrlvExtractedData = Omit<z.infer<typeof crlvExtractedSchema>, 'isCrlv'>;
