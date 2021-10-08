import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/metadata';

@Controller()
export class AppController {

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Public()
  @Get('')
  getHello(): string {
    return "Hello World!";
  }
}
