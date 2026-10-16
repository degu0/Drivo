export declare const FuelType: {
    readonly GASOLINA: "GASOLINA";
    readonly ETANOL: "ETANOL";
    readonly FLEX: "FLEX";
    readonly DIESEL: "DIESEL";
    readonly GNV: "GNV";
    readonly ELETRICO: "ELETRICO";
    readonly HIBRIDO: "HIBRIDO";
};
export type FuelType = (typeof FuelType)[keyof typeof FuelType];
export declare const VehicleType: {
    readonly CARRO: "CARRO";
    readonly MOTO: "MOTO";
    readonly CAMINHONETE: "CAMINHONETE";
    readonly CAMINHAO: "CAMINHAO";
    readonly ONIBUS: "ONIBUS";
    readonly OUTRO: "OUTRO";
};
export type VehicleType = (typeof VehicleType)[keyof typeof VehicleType];
