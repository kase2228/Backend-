// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from './appointment/appointment.controller'; 
import { AppointmentService } from './appointment/appointment.service';
import { Appointment } from './appointment/appointment.entity'; 
import { AppointmentModule } from './appointment/appointment.module';
import { PatientModule } from './patient/patient.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Patient } from './patient/patient.entity';
import { PatientController } from './patient/patient.controller';
import { PatientService } from './patient/patient.service';
import { DoctorModule } from './doctor/doctor.module';
import { Doctor } from './doctor/doctor.entity';



@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Kaseman1@#',
            database: 'test11',
            entities: [Appointment, Patient, Doctor], // Update entity reference
            synchronize: true,
        }),
        TypeOrmModule.forFeature([Appointment, Patient]),
        AppointmentModule,
        PatientModule,
        AuthModule,  // Update entity reference
        ConfigModule.forRoot({
            isGlobal: true, // makes ConfigModule available globally
          }), DoctorModule, 
    ],
    controllers: [AppointmentController, PatientController], // Update controller reference
    providers: [AppointmentService, PatientService], // Update service reference
})
export class AppModule {}
