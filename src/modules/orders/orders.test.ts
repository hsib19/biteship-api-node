import { describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { OrdersService } from './orders.service';
import {
    CancelOrderRequest,
    CancelOrderResponse,
    CancellationReasonsResponse,
    CashOnDeliveryOrderRequest,
    CreateOrderResponse,
    DropOffOrderRequest,
    InstantOrderRequest,
    RetrieveOrderResponse,
    StandardOrderRequest,
} from './orders.types';

describe('OrdersService', () => {
    const mockClient: BiteshipClient = { request: vi.fn() } as unknown as BiteshipClient;
    const service = new OrdersService(mockClient);

    it('createStandardOrder should call client.request', async () => {
        const payload: StandardOrderRequest = {
            origin_contact_name: 'Amir',
            origin_contact_phone: '088888888888',
            origin_address: 'Plaza Senayan',
            origin_postal_code: 12440,
            destination_contact_name: 'John Doe',
            destination_contact_phone: '088888888888',
            destination_address: 'Lebak Bulus MRT',
            destination_postal_code: 12950,
            courier_company: 'jne',
            courier_type: 'reg',
            delivery_type: 'now',
            items: [{ name: 'Item', value: 1000, quantity: 1, weight: 100 }],
        };
        const mockResponse: CreateOrderResponse = { success: true, object: 'order', id: 'ORDER1' } as any;
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.createStandardOrder(payload);
        expect(result).toEqual(mockResponse);
        expect(mockClient.request).toHaveBeenCalledWith('/v1/orders', { method: 'POST', body: payload });
    });

    it('createInstantOrder should call client.request', async () => {
        const payload: InstantOrderRequest = {
            origin_contact_name: 'Amir',
            origin_contact_phone: '088888888888',
            origin_address: 'Plaza Senayan',
            origin_coordinate: { latitude: -6.2, longitude: 106.7 },
            destination_contact_name: 'John Doe',
            destination_contact_phone: '088888888888',
            destination_address: 'Lebak Bulus MRT',
            destination_coordinate: { latitude: -6.28, longitude: 106.77 },
            courier_company: 'grab',
            courier_type: 'instant',
            delivery_type: 'now',
            items: [{ name: 'Item', value: 1000, quantity: 1, weight: 100 }],
        };
        const mockResponse: CreateOrderResponse = { success: true, object: 'order', id: 'ORDER2' } as any;
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.createInstantOrder(payload);
        expect(result).toEqual(mockResponse);
    });

    it('createCashOnDeliveryOrder should call client.request', async () => {
        const payload: CashOnDeliveryOrderRequest = {
            origin_contact_name: 'Amir',
            origin_contact_phone: '088888888888',
            origin_address: 'Plaza Senayan',
            origin_postal_code: 12440,
            destination_contact_name: 'John Doe',
            destination_contact_phone: '088888888888',
            destination_address: 'Lebak Bulus MRT',
            destination_postal_code: 12950,
            destination_cash_on_delivery: 500000,
            destination_cash_on_delivery_type: '7_days',
            courier_company: 'sicepat',
            courier_type: 'reg',
            delivery_type: 'now',
            items: [{ name: 'Item', value: 1000, quantity: 1, weight: 100 }],
        };
        const mockResponse: CreateOrderResponse = { success: true, object: 'order', id: 'ORDER3' } as any;
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.createCashOnDeliveryOrder(payload);
        expect(result).toEqual(mockResponse);
    });

    it('createDropOffOrder should call client.request', async () => {
        const payload: DropOffOrderRequest = {
            origin_contact_name: 'Amir',
            origin_contact_phone: '088888888888',
            origin_address: 'Plaza Senayan',
            origin_postal_code: 12440,
            origin_collection_method: 'drop_off',
            destination_contact_name: 'John Doe',
            destination_contact_phone: '088888888888',
            destination_address: 'Lebak Bulus MRT',
            destination_postal_code: 12950,
            courier_company: 'sicepat',
            courier_type: 'reg',
            delivery_type: 'now',
            items: [{ name: 'Item', value: 1000, quantity: 1, weight: 100 }],
        };
        const mockResponse: CreateOrderResponse = { success: true, object: 'order', id: 'ORDER4' } as any;
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.createDropOffOrder(payload);
        expect(result).toEqual(mockResponse);
    });

    it('retrieveOrder should throw error if id missing', async () => {
        await expect(service.retrieveOrder('')).rejects.toThrow('order id is required');
    });

    it('retrieveOrder should call client.request', async () => {
        const mockResponse: RetrieveOrderResponse = { success: true, object: 'order', id: 'ORDERX' } as any;
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.retrieveOrder('ORDERX');
        expect(result).toEqual(mockResponse);
        expect(mockClient.request).toHaveBeenCalledWith('/v1/orders/ORDERX', { method: 'GET' });
    });

    it('cancelOrder should throw error if id missing', async () => {
        await expect(service.cancelOrder('', { cancellation_reason_code: 'others' })).rejects.toThrow('order id is required');
    });

    it('cancelOrder should throw error if reason code missing', async () => {
        await expect(service.cancelOrder('ORDERX', { cancellation_reason_code: '' as any })).rejects.toThrow('cancellation_reason_code is required');
    });

    it('cancelOrder should call client.request', async () => {
        const payload: CancelOrderRequest = { cancellation_reason_code: 'others', cancellation_reason: 'Accidentally ordered' };
        const mockResponse: CancelOrderResponse = { success: true, message: 'Order successfully deleted', object: 'order', id: 'ORDERX', status: 'cancelled', cancellation_reason_code: 'others', cancellation_reason: 'Accidentally ordered' };
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.cancelOrder('ORDERX', payload);
        expect(result).toEqual(mockResponse);
        expect(mockClient.request).toHaveBeenCalledWith('/v1/orders/ORDERX/cancel', { method: 'POST', body: payload });
    });

    it('getCancellationReasons should call client.request with default lang=id', async () => {
        const mockResponse: CancellationReasonsResponse = { success: true, message: 'OK', cancellation_reasons: [{ code: 'others', reason: 'Pesanan dibatalkan' }] };
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.getCancellationReasons();
        expect(result).toEqual(mockResponse);
        expect(mockClient.request).toHaveBeenCalledWith('/v1/orders/cancellation_reasons?lang=id', { method: 'GET' });
    });

    it('getCancellationReasons should call client.request with lang=en', async () => {
        const mockResponse: CancellationReasonsResponse = { success: true, message: 'OK', cancellation_reasons: [{ code: 'others', reason: 'Order cancelled' }] };
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.getCancellationReasons('en');
        expect(result).toEqual(mockResponse);
        expect(mockClient.request).toHaveBeenCalledWith('/v1/orders/cancellation_reasons?lang=en', { method: 'GET' });
    });
});
