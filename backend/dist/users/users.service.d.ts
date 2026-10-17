import { PrismaService } from "../prisma/prisma.service";
export interface CreateUserData {
    name: string;
    email: string;
    passwordHash: string;
}
export interface UpdateUserData {
    name?: string;
    email?: string;
}
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserData): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findByEmail(email: string): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        passwordHash: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findById(id: string): import("../generated/prisma/models").Prisma__UserClient<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateCurrent(id: string, data: UpdateUserData): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updatePassword(id: string, currentPassword: string, password: string): Promise<boolean>;
}
