// appointment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from 'typeorm';



@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    gender: string;

    @Column()
    date: string;

    @Column()
    time: string;

    @Column()
    doctor: string;

    @Column()
    department: string;

    @Column()
    messages: string;

    @Column({ nullable: true })
    medicalReport: string;


}
