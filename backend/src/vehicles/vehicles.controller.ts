import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Multer } from 'multer';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import type { AuthenticatedUser } from '../auth/types/auth.types';
import {
  CreateVehicleDto,
  isValidModelYear,
  MODEL_YEAR_MESSAGE,
} from './dto/create.dto';
import { UpdateVehicleDto } from './dto/update.dto';
import { VehiclesService } from './vehicles.service';

const MAX_CRLV_SIZE = 5 * 1024 * 1024;

@ApiTags('Vehicles')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiCreatedResponse({ description: 'Vehicle created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({
    description: 'Vehicle with this plate, chassis or renavam already exists',
  })
  createVehicle(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Body() data: CreateVehicleDto,
  ) {
    return this.vehiclesService.create(currentUser.id, data);
  }

  @Post('crlv/scan')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Scan a CRLV file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiOkResponse({
    description: 'Extracted data; unidentified fields are returned as null',
  })
  @ApiBadRequestResponse({
    description: 'File missing, too large or of an invalid type',
  })
  @ApiUnprocessableEntityResponse({
    description: 'The file does not appear to be a CRLV',
  })
  @ApiTooManyRequestsResponse({ description: 'AI usage limit reached' })
  @ApiBadGatewayResponse({ description: 'Failed to communicate with the AI service' })
  scanCrlv(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: MAX_CRLV_SIZE }),
          new FileTypeValidator({
            fileType: /^(image\/(jpeg|png)|application\/pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.vehiclesService.scanCrlv(file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all vehicles for the current user' })
  @ApiOkResponse({ description: 'Vehicles retrieved successfully' })
  getAllVehicles(@CurrentUser() currentUser: AuthenticatedUser) {
    return this.vehiclesService.findAllByUser(currentUser.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vehicle by ID for the current user' })
  @ApiOkResponse({ description: 'Vehicle retrieved successfully' })
  @ApiBadRequestResponse({ description: 'Invalid vehicle ID' })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async getVehicleById(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const vehicle = await this.vehiclesService.findById(id, currentUser.id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return vehicle;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a vehicle by ID for the current user' })
  @ApiOkResponse({ description: 'Vehicle updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  @ApiConflictResponse({
    description: 'Vehicle with this plate, chassis or renavam already exists',
  })
  async updateVehicle(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: UpdateVehicleDto,
  ) {
    const vehicle = await this.vehiclesService.findById(id, currentUser.id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    if (!isValidModelYear({ ...vehicle, ...data })) {
      throw new BadRequestException(MODEL_YEAR_MESSAGE);
    }

    return this.vehiclesService.update(id, currentUser.id, data);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a vehicle by ID for the current user' })
  @ApiNoContentResponse({ description: 'Vehicle deleted successfully' })
  @ApiBadRequestResponse({ description: 'Invalid vehicle ID' })
  @ApiNotFoundResponse({ description: 'Vehicle not found' })
  async deleteVehicle(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const vehicle = await this.vehiclesService.findById(id, currentUser.id);

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    await this.vehiclesService.delete(id, currentUser.id);

    return { message: 'Vehicle deleted successfully' };
  }
}
