// create-user.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    gender: string;

    date: string;

    time: string;

    doctor: string;

    department: string;

    messages: string;
    


}
