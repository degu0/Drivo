import { FuelType, VehicleType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CrlvExtractedData } from './crlv/crlv.schema';
import { GeminiService } from '../gemini/gemini.service';
export interface CreateVehicleData {
    imageUrl?: string;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: FuelType;
    type: VehicleType;
    nickname?: string;
}
export type UpdateVehicleData = Partial<CreateVehicleData>;
export declare class VehiclesService {
    private readonly prisma;
    private readonly geminiService;
    constructor(prisma: PrismaService, geminiService: GeminiService);
    findAllByUser(userId: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        type: VehicleType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: FuelType;
        nickname: string | null;
        userId: string;
    }[]>;
    findById(id: string, userId: string): import("../generated/prisma/models").Prisma__VehicleClient<{
        type: VehicleType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: FuelType;
        nickname: string | null;
        userId: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    create(userId: string, data: CreateVehicleData): import("../generated/prisma/models").Prisma__VehicleClient<{
        type: VehicleType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: FuelType;
        nickname: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update(id: string, userId: string, data: UpdateVehicleData): import("../generated/prisma/models").Prisma__VehicleClient<{
        type: VehicleType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: FuelType;
        nickname: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    delete(id: string, userId: string): import("../generated/prisma/models").Prisma__VehicleClient<{
        type: VehicleType;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: FuelType;
        nickname: string | null;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    scanCrlv(file: Express.Multer.File): Promise<CrlvExtractedData>;
}
