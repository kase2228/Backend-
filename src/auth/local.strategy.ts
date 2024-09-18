import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const patient = await this.authService.validatePatient(email, password);
    if (!patient) {
      throw new UnauthorizedException();
    }
    
    return patient;
  }
}

@Injectable()
export class LocalDoctorStrategy extends PassportStrategy(Strategy, 'local-doctor') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'username' });
  }

  async validate(username: string, password: string): Promise<any> {
    const doctor = await this.authService.validateDoctor(username, password);
    if (!doctor) {
      throw new UnauthorizedException();
    }
    return doctor;
  }
}
