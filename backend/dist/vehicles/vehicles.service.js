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
exports.VehiclesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crlv_schema_1 = require("./crlv/crlv.schema");
const gemini_service_1 = require("../gemini/gemini.service");
const crlv_prompt_1 = require("./crlv/crlv.prompt");
let VehiclesService = class VehiclesService {
    prisma;
    geminiService;
    constructor(prisma, geminiService) {
        this.prisma = prisma;
        this.geminiService = geminiService;
    }
    findAllByUser(userId) {
        return this.prisma.vehicle.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    findById(id, userId) {
        return this.prisma.vehicle.findFirst({
            where: { id, userId },
        });
    }
    create(userId, data) {
        return this.prisma.vehicle.create({
            data: { ...data, userId },
        });
    }
    update(id, userId, data) {
        return this.prisma.vehicle.update({
            where: { id, userId },
            data,
        });
    }
    delete(id, userId) {
        return this.prisma.vehicle.delete({
            where: { id, userId },
        });
    }
    async scanCrlv(file) {
        const raw = await this.geminiService.extractFromFile({
            file: file.buffer,
            mimeType: file.mimetype,
            prompt: crlv_prompt_1.CRLV_PROMPT,
            responseJsonSchema: crlv_schema_1.crlvAiJsonSchema,
        });
        const result = crlv_schema_1.crlvExtractedSchema.safeParse(raw);
        if (!result.success || !result.data.isCrlv) {
            throw new common_1.UnprocessableEntityException('Could not identify a CRLV in the uploaded file');
        }
        const { isCrlv, ...data } = result.data;
        return data;
    }
};
exports.VehiclesService = VehiclesService;
exports.VehiclesService = VehiclesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        gemini_service_1.GeminiService])
], VehiclesService);
//# sourceMappingURL=vehicles.service.js.map