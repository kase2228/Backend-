import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor } from './doctor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorService],
  controllers: [DoctorController]
})
export class DoctorModule {}
