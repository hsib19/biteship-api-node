import { BiteshipClient } from '../../client/index';
import { SearchAreaResponse } from './maps.types';

export class MapsService {
    private readonly endpoint = '/v1/maps/areas';

    constructor(private client: BiteshipClient) { }

    async searchArea(
        countries: string,
        input: string,
        type: 'single' | 'multiple' = 'single'
    ): Promise<SearchAreaResponse> {
        if (!countries || !input) {
            throw new Error('countries and input are required');
        }

        const url = `${this.endpoint}?countries=${countries}&input=${encodeURIComponent(
            input
        )}&type=${type}`;

        return this.client.request<SearchAreaResponse>(url, { method: 'GET' });
    }
}
