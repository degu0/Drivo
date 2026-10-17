import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FuelType, VehicleType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  crlvAiJsonSchema,
  CrlvExtractedData,
  crlvExtractedSchema,
} from './crlv/crlv.schema';
import { GeminiService } from '../gemini/gemini.service';
import { CRLV_PROMPT } from './crlv/crlv.prompt';

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

@Injectable()
export class VehiclesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly geminiService: GeminiService,
  ) {}

  findAllByUser(userId: string) {
    return this.prisma.vehicle.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string, userId: string) {
    return this.prisma.vehicle.findFirst({
      where: { id, userId },
    });
  }

  create(userId: string, data: CreateVehicleData) {
    return this.prisma.vehicle.create({
      data: { ...data, userId },
    });
  }

  update(id: string, userId: string, data: UpdateVehicleData) {
    return this.prisma.vehicle.update({
      where: { id, userId },
      data,
    });
  }

  delete(id: string, userId: string) {
    return this.prisma.vehicle.delete({
      where: { id, userId },
    });
  }

  async scanCrlv(file: Express.Multer.File): Promise<CrlvExtractedData> {
    const raw = await this.geminiService.extractFromFile({
      file: file.buffer,
      mimeType: file.mimetype,
      prompt: CRLV_PROMPT,
      responseJsonSchema: crlvAiJsonSchema,
    });

    const result = crlvExtractedSchema.safeParse(raw);

    if (!result.success || !result.data.isCrlv) {
      throw new UnprocessableEntityException(
        'Could not identify a CRLV in the uploaded file',
      );
    }
    const { isCrlv, ...data } = result.data;
    return data;
  }
}
