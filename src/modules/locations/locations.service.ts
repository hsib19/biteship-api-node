import { BiteshipClient } from '../../client/index';
import { CreateLocationRequest, CreateLocationResponse, DeleteLocationResponse, GetLocationResponse, UpdateLocationRequest, UpdateLocationResponse } from './locations.types';

export class LocationsService {
    private readonly endpoint = '/v1/locations';

    constructor(private client: BiteshipClient) { }

    async createLocation(data: CreateLocationRequest): Promise<CreateLocationResponse> {
        if (!data.name || !data.contact_name || !data.contact_phone || !data.address) {
            throw new Error('name, contact_name, contact_phone, and address are required');
        }

        return this.client.request<CreateLocationResponse>(this.endpoint, {
            method: 'POST',
            body: data,
        });
    }

    async getLocationById(id: string): Promise<GetLocationResponse> {
        if (!id) {
            throw new Error('location id is required');
        }

        return this.client.request<GetLocationResponse>(`${this.endpoint}/${id}`, {
            method: 'GET',
        });
    }

    async updateLocation(id: string, data: UpdateLocationRequest): Promise<UpdateLocationResponse> {
        if (!id) {
            throw new Error('location id is required');
        }

        return this.client.request<UpdateLocationResponse>(`${this.endpoint}/${id}`, {
            method: 'POST',
            body: data,
        });
    }

    async deleteLocation(id: string): Promise<DeleteLocationResponse> {
        if (!id) {
            throw new Error('location id is required');
        }

        return this.client.request<DeleteLocationResponse>(`${this.endpoint}/${id}`, {
            method: 'DELETE',
        });
    }

}
