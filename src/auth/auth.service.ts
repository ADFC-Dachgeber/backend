import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { logger } from '../../logging';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    private readonly logger;

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {
        this.logger = logger.child({ scope: AuthService.name });
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.find(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result;
        } else {
            return null;
        }
    }

    login(user: any) {
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
