import { Module } from '@nestjs/common';
import { GeminiModule } from '../gemini/gemini.module';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';

@Module({
  imports: [GeminiModule],
  providers: [VehiclesService],
  controllers: [VehiclesController],
})
export class VehiclesModule {}
