import { BiteshipClient } from '../../client/index';
import { GetPublicTrackingResponse, GetTrackingResponse } from './trackings.types';

export class TrackingsService {
    private readonly endpoint = '/v1/trackings';

    constructor(private client: BiteshipClient) { }

    async getTrackingById(id: string): Promise<GetTrackingResponse> {
        if (!id) {
            throw new Error('tracking id is required');
        }

        return this.client.request<GetTrackingResponse>(`${this.endpoint}/${id}`, {
            method: 'GET',
        });
    }

    async getPublicTracking(waybillId: string, courierCode: string): Promise<GetPublicTrackingResponse> {
        if (!waybillId || !courierCode) {
            throw new Error('waybillId and courierCode are required');
        }

        return this.client.request<GetPublicTrackingResponse>(
            `${this.endpoint}/${waybillId}/couriers/${courierCode}`,
            { method: 'GET' }
        );
    }

}
