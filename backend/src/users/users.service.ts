import { Injectable } from '@nestjs/common';
import { hashPassword } from 'src/auth/password';
import { PrismaService } from 'src/prisma/prisma.service';

export interface CreateUserData {
  name: string;
  email: string;
  passwordHash: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserData) {
    return this.prisma.user.create({
      data,
      omit: { passwordHash: true },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { passwordHash: true },
    });
  }

  async updateCurrent(id: string, data: UpdateUserData) {
    return await this.prisma.user.update({
      where: { id },
      data,
      omit: { passwordHash: true },
    });
  }

  async updatePassword(id: string, password: string) {
    const passwordHash = await hashPassword(password);

    await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
      select: { id: true },
    });

    return true;
  }
}
