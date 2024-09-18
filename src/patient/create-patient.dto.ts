import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreatePatientDto {
  
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }
  

