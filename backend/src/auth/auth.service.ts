import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login';
import { comparePassword, hashPassword } from './password';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const passwordHash = await hashPassword(dto.password);

    const user = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      passwordHash,
    });

    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);

    const passwordMatches =
      user && (await comparePassword(dto.password, user.passwordHash));

    if (!user || !passwordMatches) {
      throw new ConflictException('Invalid email or password');
    }

    return this.buildAuthResponse(user);
  }

  private async buildAuthResponse(user: AuthUser) {
    const accessToken = await this.jwtService.signAsync({ sub: user.id });
    
    return {
      accessToken,
      user: { id: user.id, name: user.name, email: user.email },
    };
  }
}
