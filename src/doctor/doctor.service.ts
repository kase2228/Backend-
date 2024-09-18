// src/doctor/doctor.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findOne(id: number): Promise<Doctor> {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async create(doctorData: Partial<Doctor>): Promise<Doctor> {
  const saltRounds = 10; // Adjust salt rounds as necessary
  const hashedPassword = await bcrypt.hash(doctorData.password, saltRounds);
  const newDoctor = this.doctorRepository.create({
    ...doctorData,
    password: hashedPassword,
  });
  return this.doctorRepository.save(newDoctor);
}

  async delete(id: number): Promise<boolean> {
  const result = await this.doctorRepository.delete(id);
  return result.affected > 0;
}
}
