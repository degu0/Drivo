import { UsersService } from './users.service';
import type { AuthenticatedUser } from "../auth/types/auth.types";
import { UpdatePasswordDto, UpdateUserDto } from './dto/update.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    getCurrentUser(currentUser: AuthenticatedUser): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCurrentUser(currentUser: AuthenticatedUser, data: UpdateUserDto): Promise<{
        id: string;
        name: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCurrentUserPassword(currentUser: AuthenticatedUser, data: UpdatePasswordDto): Promise<{
        message: string;
    }>;
}
