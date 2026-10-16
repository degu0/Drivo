import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        accessToken: Promise<string>;
        user: {
            id: string;
            name: string;
            email: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: Promise<string>;
        user: {
            id: string;
            name: string;
            email: string;
        };
    }>;
}
