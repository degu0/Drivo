import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { comparePassword, hashPassword } from 'src/auth/password';
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
    if (data.email) {
      const existingUser = await this.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already in use');
      }
    }

    return await this.prisma.user.update({
      where: { id },
      data,
      omit: { passwordHash: true },
    });
  }

  async updatePassword(id: string, currentPassword: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { passwordHash: true },
    });
    if (!user) {
      return false;
    }

    const passwordMatches = await comparePassword(
      currentPassword,
      user.passwordHash,
    );
    if (!passwordMatches) {
      throw new BadRequestException('Current password is incorrect');
    }

    const passwordHash = await hashPassword(password);

    await this.prisma.user.update({
      where: { id },
      data: { passwordHash },
      select: { id: true },
    });

    return true;
  }
}
