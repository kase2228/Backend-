import { Controller, Get, Post, UseGuards, Request, Body, ValidationPipe, HttpException, HttpStatus, Delete, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './create-patient.dto';
import { Patient } from './patient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';




@Controller('patients')
export class PatientController {
  constructor(
    private readonly patientService: PatientService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('account11')
  async getAccount(@Request() req) {
    return this.patientService.findOneById(req.patient.patientId);
  }

  @Get('patient')
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  async getPatient(@Request() req) {
    return this.patientService.findOneById(req.user.patientId);
  }

  @Post('signup')
  async create(@Body(new ValidationPipe()) createPatientDto: CreatePatientDto): Promise<Patient> {
    const { firstName, lastName, username, email, password } = createPatientDto;

    const patient = await this.patientService.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    return patient;
  }

  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    const deleted = await this.patientService.delete(id);
    if (!deleted) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      message: 'Patient deleted successfully',
    };
  }
}
