import { User } from '.prisma/client';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/metadata';
import { ResetTokenGuard } from './auth/reset-token.guard';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
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
  @UseGuards(ResetTokenGuard)
  @Patch('auth/reset-password')
  async resetPassword(
    @Body('password') password: string,
    @Body('email') email: string,
  ): Promise<void> {
    await this.usersService.setPassword(email, password);
  }
}
