// appointment.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity'; // Update import


@Injectable()
export class AppointmentService {
    constructor(
        @InjectRepository(Appointment)
        private appointmentsRepository: Repository<Appointment>,
    ) {}

    async create(appointment: Appointment): Promise<Appointment> {
        return this.appointmentsRepository.save(appointment);
    }

    findAll(): Promise<Appointment[]> {
        return this.appointmentsRepository.find();
      }

    async delete(id: number): Promise<boolean> {
        const result = await this.appointmentsRepository.delete(id);
        return result.affected > 0;
      }

      async findByEmail(email: string): Promise<Appointment[]> {
        return this.appointmentsRepository.find({ where: { email } });
    }

    async getAppointmentsByDoctor(doctor: string): Promise<Appointment[]> {
        return this.appointmentsRepository.find({
          where: { doctor },
        });
      }
    
    async writeMedicalReport(id: number, medicalReport: string): Promise<Appointment> {
        const appointment = await this.appointmentsRepository.findOne({where: { id }});
        if (!appointment) {
          throw new Error('Appointment not found');
        }
        appointment.medicalReport = medicalReport;
        return this.appointmentsRepository.save(appointment);
      }

    async getTopUpcomingAppointmentsByEmail(email: string): Promise<Appointment[]> {
        return this.appointmentsRepository.find({
            where: { email: email },
            order: { date: 'ASC' },
            take: 3,
        });
      }

}
