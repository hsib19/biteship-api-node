import { beforeEach, describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { RatesService } from './rates.service';
import { GetRatesResponse, RateItem } from './rates.types';

const mockClient = {
    request: vi.fn(),
} as unknown as BiteshipClient;

const service = new RatesService(mockClient);

const mockItems: RateItem[] = [
    {
        name: 'Item A',
        value: 1000,
        quantity: 1,
        weight: 500,
        length: 10,
        width: 5,
        height: 2,
    },
];

const mockResponse: GetRatesResponse = {
    success: true,
    object: 'courier_pricing',
    message: 'ok',
    code: 200,
    origin: {} as any,
    destination: {} as any,
    pricing: [],
};

describe('RatesService additional methods', () => {
    beforeEach(() => {
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);
    });

    it('should throw error if couriers is empty', async () => {
        await expect(
            service['request']({ couriers: '', items: [{ name: 'x', value: 100, quantity: 1, weight: 100, length: 1, width: 1, height: 1 }] } as any)
        ).rejects.toThrow('couriers and items are required');
    });

    it('should throw error if items is empty', async () => {
        await expect(
            service['request']({ couriers: 'jne', items: [] } as any)
        ).rejects.toThrow('couriers and items are required');
    });

    it('getRatesByPostalCode should call client.request', async () => {
        const result = await service.getRatesByPostalCode(
            { postalCode: 12345 },
            { postalCode: 54321 },
            'jne',
            mockItems
        );
        expect(mockClient.request).toHaveBeenCalled();
        expect(result.success).toBe(true);
    });

    it('getRatesByAreaId should call client.request', async () => {
        const result = await service.getRatesByAreaId(
            { areaId: 'area1' },
            { areaId: 'area2' },
            'pos',
            mockItems
        );
        expect(mockClient.request).toHaveBeenCalled();
        expect(result.success).toBe(true);
    });

    it('getRatesByMix should call client.request', async () => {
        const result = await service.getRatesByMix(
            { postalCode: 12345, latitude: -6.2 },
            { postalCode: 54321, longitude: 106.7 },
            'sicepat',
            mockItems
        );
        expect(mockClient.request).toHaveBeenCalled();
        expect(result.success).toBe(true);
    });

    it('getRatesByType should call client.request with type', async () => {
        const result = await service.getRatesByType(
            'origin_suggestion_to_closest_destination',
            { latitude: -6.3, longitude: 106.7 },
            'jne',
            mockItems
        );
        expect(mockClient.request).toHaveBeenCalledWith(
            '/v1/rates/couriers',
            expect.objectContaining({
                method: 'POST',
                body: expect.objectContaining({
                    type: 'origin_suggestion_to_closest_destination',
                }),
            })
        );
        expect(result.success).toBe(true);
    });

    it('getRatesWithInsurance should include insurance', async () => {
        const result = await service.getRatesWithInsurance(
            { postalCode: 12345 },
            { postalCode: 54321 },
            'jne',
            mockItems,
            5000
        );
        expect(mockClient.request).toHaveBeenCalled();
        expect(result.success).toBe(true);
    });

    it('getRatesWithCOD should include COD options', async () => {
        const result = await service.getRatesWithCOD(
            { postalCode: 12345 },
            { postalCode: 54321 },
            'jne',
            mockItems,
            { amount: 10000, type: '3_days' }
        );
        expect(mockClient.request).toHaveBeenCalled();
        expect(result.success).toBe(true);
    });

    it('getRatesByCoordinates should call client.request with coordinates payload', async () => {
        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const origin = { latitude: -6.2, longitude: 106.8 };
        const destination = { latitude: -6.3, longitude: 106.7 };

        const result = await service.getRatesByCoordinates(
            origin,
            destination,
            'jne',
            [
                {
                    name: 'Item A',
                    value: 1000,
                    quantity: 1,
                    weight: 500,
                    length: 10,
                    width: 5,
                    height: 2,
                },
            ]
        );

        expect(mockClient.request).toHaveBeenCalledWith(
            '/v1/rates/couriers',
            expect.objectContaining({
                method: 'POST',
                body: expect.objectContaining({
                    origin_latitude: origin.latitude,
                    origin_longitude: origin.longitude,
                    destination_latitude: destination.latitude,
                    destination_longitude: destination.longitude,
                    couriers: 'jne',
                }),
            })
        );

        expect(result.success).toBe(true);
    });
});
