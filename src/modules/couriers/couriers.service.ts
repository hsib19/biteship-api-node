import { BiteshipClient } from '../../client/index';
import { GetCouriersResponse } from './couriers.types';

export class CouriersService {
    private readonly endpoint = '/v1/couriers';

    constructor(private client: BiteshipClient) { }

    async getCouriers(): Promise<GetCouriersResponse> {
        return this.client.request<GetCouriersResponse>(this.endpoint, {
            method: 'GET',
        });
    }
}
