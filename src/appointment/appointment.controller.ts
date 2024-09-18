import { Controller, Post, Body, Get, HttpException, HttpStatus, Delete, Param,Put, UseGuards, Request } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; 

@Controller('appointments')
export class AppointmentController {
    constructor(private readonly appointmentService: AppointmentService) {}

    @Get('doctor/:doctorName')
    async getAppointmentsByDoctor(@Param('doctorName') doctorName: string): Promise<Appointment[]> {
      return this.appointmentService.getAppointmentsByDoctor(doctorName);
    }
  
    @Put(':id/medical-report')
    async writeMedicalReport(
      @Param('id') id: number,
      @Body() body: { medicalReport: string },
    ): Promise<Appointment> {
      return this.appointmentService.writeMedicalReport(id, body.medicalReport);
    }

    @Post('post')
    async create(@Body() createAppointmentDto: Appointment): Promise<Appointment> {
        return this.appointmentService.create(createAppointmentDto);
    }

    @Get('appointmentdata')
    findAll(): Promise<Appointment[]> {
        return this.appointmentService.findAll();
    }

    @Delete(':id')
    async deleteAppointment(@Param('id') id: number) {
        const deleted = await this.appointmentService.delete(id);
        if (!deleted) {
            throw new HttpException('Appointment not found', HttpStatus.NOT_FOUND);
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'Appointment deleted successfully',
        };
    }


    @Get('email/:email')
    async findByEmail(@Param('email') email: string): Promise<Appointment[]> {
        return this.appointmentService.findByEmail(email);

}

    @Get('top-upcoming/:email')
    async getTopUpcomingAppointmentsByEmail(@Param('email') email: string): Promise<Appointment[]> {
    return this.appointmentService.getTopUpcomingAppointmentsByEmail(email);
}
}
