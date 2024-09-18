import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
// import { Company } from '../company/company.entity';
// import { PaymentModule } from '../payment/payment.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [
    // TypeOrmModule.forFeature([Patient, Company]),
    TypeOrmModule.forFeature([Patient]),
    AuthModule,
    // PaymentModule,
  ],
  providers: [PatientService],
  controllers: [PatientController],
  exports: [PatientService],
})
export class PatientModule {}
