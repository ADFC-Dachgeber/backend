import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logger } from '../../logging';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    this.logger = logger.child({ scope: AuthService.name });
  }

  async validateUser(username: string, password: string): Promise<any> {
    return await this.usersService.validate(username, password);
  }

  login(user: any) {
    const payload = { sub: user.id, email: user.email, name: user.name };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
