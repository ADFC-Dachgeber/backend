import { Controller, Get } from '@nestjs/common';
import { DachgebersService } from './dachgebers.service';
import { GeoJSON } from 'geojson';

@Controller('dachgebers')
export class DachgebersController {
  constructor(private readonly dachgebersService: DachgebersService) {}

  @Get()
  async get(): Promise<GeoJSON> {
    return await this.dachgebersService.all();
  }
}
