import { User } from '.prisma/client';
import { Body, Controller, Get, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/metadata';
import { ResetTokensService } from './reset-tokens/reset-tokens.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly resetTokensService: ResetTokensService,
    private readonly usersService: UsersService,
  ) { }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Get('')
  getHello(): string {
    return this.appService.getHello();
  }

  @Public()
  @Patch('auth/reset-password')
  async resetPassword(
    @Body('resetToken') resetToken: string,
    @Body('password') password: string
  ): Promise<User> {
    const token = await this.resetTokensService.validate(resetToken);
    const user = await this.usersService.find(token.userId);

    if (token) {
      return await this.usersService.setPassword(user, password);
    } else {
      throw new UnauthorizedException();
    }
  }
}
