import { BiteshipClient } from '../../client/index';
import { ConfirmDraftOrderResponse, CreateDraftOrderRequest, CreateDraftOrderResponse, DeleteDraftOrderResponse, RetrieveDraftOrderRatesResponse, RetrieveDraftOrderResponse, UpdateDraftOrderRequest, UpdateDraftOrderResponse } from './draft-orders.types';

export class DraftOrdersService {
    private readonly endpoint = '/v1/draft_orders';

    constructor(private client: BiteshipClient) { }

    async createDraftOrder(data: CreateDraftOrderRequest): Promise<CreateDraftOrderResponse> {
        if (!data.origin_contact_name || !data.origin_contact_phone || !data.origin_address) {
            throw new Error('origin_contact_name, origin_contact_phone, and origin_address are required');
        }
        if (!data.destination_contact_name || !data.destination_contact_phone || !data.destination_address) {
            throw new Error('destination_contact_name, destination_contact_phone, and destination_address are required');
        }
        if (!data.delivery_type) {
            throw new Error('delivery_type is required');
        }
        if (!data.items || data.items.length === 0) {
            throw new Error('items are required');
        }

        return this.client.request<CreateDraftOrderResponse>(this.endpoint, {
            method: 'POST',
            body: data,
        });
    }

    async retrieveDraftOrder(id: string): Promise<RetrieveDraftOrderResponse> {
        if (!id) {
            throw new Error('draft order id is required');
        }

        return this.client.request<RetrieveDraftOrderResponse>(`${this.endpoint}/${id}`, {
            method: 'GET',
        });
    }

    async retrieveDraftOrderRates(id: string): Promise<RetrieveDraftOrderRatesResponse> {
        if (!id) {
            throw new Error('draft order id is required');
        }

        return this.client.request<RetrieveDraftOrderRatesResponse>(`${this.endpoint}/${id}/rates`, {
            method: 'GET',
        });
    }

    async updateDraftOrder(id: string, data: UpdateDraftOrderRequest): Promise<UpdateDraftOrderResponse> {
        if (!id) {
            throw new Error('draft order id is required');
        }

        return this.client.request<UpdateDraftOrderResponse>(`${this.endpoint}/${id}`, {
            method: 'POST',
            body: data,
        });
    }

    async deleteDraftOrder(id: string): Promise<DeleteDraftOrderResponse> {
        if (!id) {
            throw new Error('draft order id is required');
        }

        return this.client.request<DeleteDraftOrderResponse>(`${this.endpoint}/${id}`, {
            method: 'DELETE',
        });
    }

    async confirmDraftOrder(id: string): Promise<ConfirmDraftOrderResponse> {
        if (!id) {
            throw new Error('draft order id is required');
        }

        return this.client.request<ConfirmDraftOrderResponse>(`${this.endpoint}/${id}/confirm`, {
            method: 'POST',
        });
    }

}
