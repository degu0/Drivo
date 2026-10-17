import type { AuthenticatedUser } from '../auth/types/auth.types';
import { CreateVehicleDto } from './dto/create.dto';
import { UpdateVehicleDto } from './dto/update.dto';
import { VehiclesService } from './vehicles.service';
export declare class VehiclesController {
    private readonly vehiclesService;
    constructor(vehiclesService: VehiclesService);
    createVehicle(currentUser: AuthenticatedUser, data: CreateVehicleDto): import("../generated/prisma/models").Prisma__VehicleClient<{
        type: import("../generated/prisma/enums").VehicleType;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: import("../generated/prisma/enums").FuelType;
        nickname: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    getAllVehicles(currentUser: AuthenticatedUser): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        type: import("../generated/prisma/enums").VehicleType;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: import("../generated/prisma/enums").FuelType;
        nickname: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }[]>;
    getVehicleById(currentUser: AuthenticatedUser, id: string): Promise<{
        type: import("../generated/prisma/enums").VehicleType;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: import("../generated/prisma/enums").FuelType;
        nickname: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    updateVehicle(currentUser: AuthenticatedUser, id: string, data: UpdateVehicleDto): Promise<{
        type: import("../generated/prisma/enums").VehicleType;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: import("../generated/prisma/enums").FuelType;
        nickname: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
    }>;
    deleteVehicle(currentUser: AuthenticatedUser, id: string): Promise<{
        message: string;
    }>;
}
