import { Controller, Get } from '@nestjs/common';

@Controller('accounts')
export class AccountsController {
  @Get()
  async get() {
    return;
  }
}
