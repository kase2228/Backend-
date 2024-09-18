// src/doctor/doctor.controller.ts

import { Controller, Get, Param ,Post,Body, ValidationPipe, Delete} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './create-doctor.dto';

@Controller('doctors')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('doctor')
  async findAll(): Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Doctor> {
    return this.doctorService.findOne(+id);
  }

  @Post('signup')
  async create(@Body(new ValidationPipe()) createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorService.create(createDoctorDto);
    return doctor;
  }

  @Delete(':id')
  async deleteDoctor(@Param('id') id: string): Promise<{ deleted: boolean }> {
      const deleted = await this.doctorService.delete(parseInt(id, 10));
      return { deleted };
  }
}
