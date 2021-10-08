import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logger } from 'logging';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    private readonly logger;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {
        this.logger = logger.child({ scope: AuthService.name });
    }

    async validateUser(email: string, password: string): Promise<any> {
        this.logger.debug("Hello!");
        const user = await this.usersService.find(email);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
