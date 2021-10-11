import { Account, Description, Location } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { Feature, GeoJSON } from 'geojson';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class DachgebersService {
    constructor(private readonly accountsService: AccountsService) { };

    async all(): Promise<GeoJSON> {
        const accounts = await this.accountsService.allWithDescriptionAndCoord();
        return {
            type: "FeatureCollection",
            features: accounts.map(featureFromAccount),
        };
    }
}

function featureFromAccount(account: Account & { description: Description, location: Location }): Feature {
    const { latitude, longitude } = account.location;
    return {
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [latitude, longitude],
        },
        properties: {
            description: account.description.text,
        }
    };
}