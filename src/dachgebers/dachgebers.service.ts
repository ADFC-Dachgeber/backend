import { Account, Description, Location, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Feature, GeoJSON } from 'geojson';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class DachgebersService {
  constructor(private readonly accountsService: AccountsService) {}

  async all(): Promise<GeoJSON> {
    const accounts = await this.accountsService.allForDachgeber();
    return {
      type: 'FeatureCollection',
      features: accounts.map(featureFromAccount),
    };
  }
}

function featureFromAccount(
  dachgeber: Account & {
    description: Description;
    location: Location;
    users: Omit<User, 'password'>[];
  },
): Feature {
  const { latitude, longitude } = dachgeber.location;
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [latitude, longitude],
    },
    properties: {
      name: dachgeber.users.map(({ name }) => name).join(' & '),
      description: dachgeber.description.text,
    },
  };
}
