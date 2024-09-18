import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  speciality: string;
  
  @Column()
  password: string;


  
}
