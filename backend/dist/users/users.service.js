"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const password_1 = require("../auth/password");
const prisma_service_1 = require("../prisma/prisma.service");
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(data) {
        return this.prisma.user.create({
            data,
            omit: { passwordHash: true },
        });
    }
    findByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
            omit: { passwordHash: true },
        });
    }
    async updateCurrent(id, data) {
        if (data.email) {
            const existingUser = await this.findByEmail(data.email);
            if (existingUser && existingUser.id !== id) {
                throw new common_1.ConflictException('Email already in use');
            }
        }
        return await this.prisma.user.update({
            where: { id },
            data,
            omit: { passwordHash: true },
        });
    }
    async updatePassword(id, currentPassword, password) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: { passwordHash: true },
        });
        if (!user) {
            return false;
        }
        const passwordMatches = await (0, password_1.comparePassword)(currentPassword, user.passwordHash);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('Current password is incorrect');
        }
        const passwordHash = await (0, password_1.hashPassword)(password);
        await this.prisma.user.update({
            where: { id },
            data: { passwordHash },
            select: { id: true },
        });
        return true;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map