import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Patient } from '../patient/patient.entity'; // Updated import
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from '../patient/patient.module'; // Updated import
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy, LocalDoctorStrategy  } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Doctor } from '../doctor/doctor.entity';

@Module({
  imports: [
    forwardRef(() => PatientModule), // Updated forwardRef
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Patient, Doctor]), // Updated forFeature
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, LocalDoctorStrategy],
  controllers: [AuthController],
  exports: [AuthService,  PassportModule,],
})
export class AuthModule {}
