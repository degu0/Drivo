"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehiclesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const current_user_decorator_1 = require("../auth/decorators/current-user.decorator");
const jwt_auth_guard_1 = require("../auth/guard/jwt-auth.guard");
const create_dto_1 = require("./dto/create.dto");
const update_dto_1 = require("./dto/update.dto");
const vehicles_service_1 = require("./vehicles.service");
let VehiclesController = class VehiclesController {
    vehiclesService;
    constructor(vehiclesService) {
        this.vehiclesService = vehiclesService;
    }
    createVehicle(currentUser, data) {
        return this.vehiclesService.create(currentUser.id, data);
    }
    getAllVehicles(currentUser) {
        return this.vehiclesService.findAllByUser(currentUser.id);
    }
    async getVehicleById(currentUser, id) {
        const vehicle = await this.vehiclesService.findById(id, currentUser.id);
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        return vehicle;
    }
    async updateVehicle(currentUser, id, data) {
        const vehicle = await this.vehiclesService.findById(id, currentUser.id);
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        if (!(0, create_dto_1.isValidModelYear)({ ...vehicle, ...data })) {
            throw new common_1.BadRequestException(create_dto_1.MODEL_YEAR_MESSAGE);
        }
        return this.vehiclesService.update(id, currentUser.id, data);
    }
    async deleteVehicle(currentUser, id) {
        const vehicle = await this.vehiclesService.findById(id, currentUser.id);
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        await this.vehiclesService.delete(id, currentUser.id);
        return { message: 'Vehicle deleted successfully' };
    }
};
exports.VehiclesController = VehiclesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new vehicle' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Vehicle created successfully' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Vehicle with this plate, chassis or renavam already exists',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dto_1.CreateVehicleDto]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "createVehicle", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all vehicles for the current user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vehicles retrieved successfully' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], VehiclesController.prototype, "getAllVehicles", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a vehicle by ID for the current user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vehicle retrieved successfully' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid vehicle ID' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Vehicle not found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "getVehicleById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a vehicle by ID for the current user' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Vehicle updated successfully' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input data' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Vehicle not found' }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Vehicle with this plate, chassis or renavam already exists',
    }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_dto_1.UpdateVehicleDto]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "updateVehicle", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a vehicle by ID for the current user' }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'Vehicle deleted successfully' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid vehicle ID' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Vehicle not found' }),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], VehiclesController.prototype, "deleteVehicle", null);
exports.VehiclesController = VehiclesController = __decorate([
    (0, swagger_1.ApiTags)('Vehicles'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('vehicles'),
    __metadata("design:paramtypes", [vehicles_service_1.VehiclesService])
], VehiclesController);
//# sourceMappingURL=vehicles.controller.js.map