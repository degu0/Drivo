import { Injectable } from '@nestjs/common';
import { FuelType, VehicleType } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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
  constructor(private readonly prisma: PrismaService) {}

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
}
