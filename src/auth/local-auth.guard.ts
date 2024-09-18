import { Injectable, ExecutionContext, UnauthorizedException, ConflictException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard(['local', 'local-doctor']) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    if (!result) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return result;
  }

  handleRequest(err, user, info) {
    // Custom error handling if needed
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
