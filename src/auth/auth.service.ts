import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from '../patient/patient.entity'; // Updated import
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PatientService } from '../patient/patient.service'; // Updated import
import { ConfigService } from '@nestjs/config';
import { Doctor } from '../doctor/doctor.entity'

@Injectable()
export class AuthService {
    private readonly passcode: string;
    private readonly adminName:string;
    constructor(
        @InjectRepository(Patient) // Updated InjectRepository
        private patientsRepository: Repository<Patient>, // Updated repository name
        private patientService: PatientService, // Updated service name
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectRepository(Doctor)
        private doctorsRepository: Repository<Doctor>,
    ) {
        this.passcode = '123456789';
        this.adminName = 'reception01';
    }


    async validateDoctor(username: string, pass: string): Promise<any> {
        const doctor = await this.doctorsRepository.findOne({ where: { username } });
        if (doctor && await bcrypt.compare(pass, doctor.password)) {
          const { password, ...result } = doctor;
          return result;
        }
        return null;
      }

    
      async logind(Doctor: any) {
        const payload = { username: Doctor.username, sub: Doctor.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
        };
    }

    async validatePatient(email: string, pass: string): Promise<any> {
        const patient = await this.patientsRepository.findOne({ where: { email } });
        
        if (patient && await bcrypt.compare(pass, patient.password)) {
            const { password, ...result } = patient;
            return result;
        }
        return null;
    }

    async login(patient: any) {
        const payload = { username: patient.username, sub: patient.id };
        return {
            access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
        };
    }


    async verifyCode(passcode: string, adminName: string) {
        if (passcode === this.passcode && adminName === this.adminName) {
            const payload = { passcode, adminName };
            return {
                access_token: this.jwtService.sign(payload, { secret: this.configService.get<string>('JWT_SECRET') }),
            };
        }
        throw new UnauthorizedException('Invalid username or code');
    }
}
