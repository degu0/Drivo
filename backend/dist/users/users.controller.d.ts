import { UsersService } from './users.service';
import type { AuthenticatedUser } from "../auth/types/auth.types";
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
}
