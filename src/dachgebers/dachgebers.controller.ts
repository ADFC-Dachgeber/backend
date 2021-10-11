import { Controller, Get } from '@nestjs/common';

@Controller('dachgebers')
export class DachgebersController {
    @Get()
    async get(): Promise<any> {
        return {};
    }
}
