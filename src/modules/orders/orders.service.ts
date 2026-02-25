import { BiteshipClient } from '../../client/index';
import {
    CancellationReasonsResponse,
    CancelOrderRequest,
    CancelOrderResponse,
    CashOnDeliveryOrderRequest,
    CreateOrderErrorResponse,
    CreateOrderResponse,
    DropOffOrderRequest,
    InstantOrderRequest,
    RetrieveOrderResponse,
    StandardOrderRequest,
} from './orders.types';

export class OrdersService {
    private readonly endpoint = '/v1/orders';

    constructor(private client: BiteshipClient) { }

    async createStandardOrder(
        data: StandardOrderRequest
    ): Promise<CreateOrderResponse | CreateOrderErrorResponse> {
        return this.client.request(`${this.endpoint}`, { method: 'POST', body: data });
    }

    async createInstantOrder(
        data: InstantOrderRequest
    ): Promise<CreateOrderResponse | CreateOrderErrorResponse> {
        return this.client.request(`${this.endpoint}`, { method: 'POST', body: data });
    }

    async createCashOnDeliveryOrder(
        data: CashOnDeliveryOrderRequest
    ): Promise<CreateOrderResponse | CreateOrderErrorResponse> {
        return this.client.request(`${this.endpoint}`, { method: 'POST', body: data });
    }

    async createDropOffOrder(
        data: DropOffOrderRequest
    ): Promise<CreateOrderResponse | CreateOrderErrorResponse> {
        return this.client.request(`${this.endpoint}`, { method: 'POST', body: data });
    }

    async retrieveOrder(id: string): Promise<RetrieveOrderResponse> {
        if (!id) {
            throw new Error('order id is required');
        }

        return this.client.request<RetrieveOrderResponse>(`${this.endpoint}/${id}`, {
            method: 'GET',
        });
    }

    async cancelOrder(
        id: string,
        data: CancelOrderRequest
    ): Promise<CancelOrderResponse> {
        if (!id) {
            throw new Error('order id is required');
        }
        if (!data.cancellation_reason_code) {
            throw new Error('cancellation_reason_code is required');
        }

        return this.client.request<CancelOrderResponse>(`${this.endpoint}/${id}/cancel`, {
            method: 'POST',
            body: data,
        });
    }

    async getCancellationReasons(lang: 'id' | 'en' = 'id'): Promise<CancellationReasonsResponse> {
        return this.client.request<CancellationReasonsResponse>(
            `${this.endpoint}/cancellation_reasons?lang=${lang}`,
            { method: 'GET' }
        );
    }
}
