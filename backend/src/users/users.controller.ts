import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { UsersService } from './users.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { AuthenticatedUser } from 'src/auth/types/auth.types';
import { UpdatePasswordDto, UpdateUserDto } from './dto/update.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user' })
  @ApiOkResponse({ description: 'Current user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getCurrentUser(@CurrentUser() currentUser: AuthenticatedUser) {
    const user = await this.userService.findById(currentUser.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user' })
  @ApiOkResponse({ description: 'Updated user' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiConflictResponse({ description: 'Email already in use' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  async updateCurrentUser(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() data: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.updateCurrent(
      currentUser.id,
      data,
    );

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser;
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Update current user password' })
  @ApiOkResponse({ description: 'Password updated successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async updateCurrentUserPassword(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() data: UpdatePasswordDto,
  ) {
    const updatedPassword = await this.userService.updatePassword(
      currentUser.id,
      data.password,
    );

    if (!updatedPassword) {
      throw new NotFoundException('User not found');
    }

    return { message: 'Password updated successfully' };
  }
}
