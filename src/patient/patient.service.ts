import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './create-patient.dto';
import * as bcrypt from 'bcrypt';



@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,

  ) {}

  async findOneById(id: number): Promise<Patient | undefined> {
    return this.patientRepository.findOne({ where: { id } });
  }
  

  findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async create(createPatientDto: Partial<CreatePatientDto>): Promise<Patient> {
    const { password,email, ...patientDetails } = createPatientDto;
    
    const existingPatient = await this.patientRepository.findOne({ where: { email } });
    if (existingPatient) {
      throw new ConflictException('Email already exists');
    }


    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const patient = new Patient();
    patient.firstName = patientDetails.firstName;
    patient.lastName = patientDetails.lastName;
    patient.username = patientDetails.username;
    patient.email = email;
    patient.password = hashedPassword;
  
    try {
      return await this.patientRepository.save(patient);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.patientRepository.delete(id);
    return result.affected > 0;
  }
  
}
 