import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

export interface CreateUserData {
    name: string;
    email: string;
    passwordHash: string;
}

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreateUserData) {
        return this.prisma.user.create({
            data,
            omit: {passwordHash: true}
        });
    }

    findByEmail(email: string) {
        return this.prisma.user.findUnique({
            where: { email }
        });
    }

    findById(id: string) {
        return this.prisma.user.findUnique({
            where: { id },
            omit: { passwordHash: true }
        });
    }
}
