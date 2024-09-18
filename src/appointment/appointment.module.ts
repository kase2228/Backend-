import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './appointment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]), // Ensure Appointment entity is imported correctly
],
  providers: [AppointmentService],
  controllers: [AppointmentController]
})
export class AppointmentModule {}
