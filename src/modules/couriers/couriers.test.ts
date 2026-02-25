import { describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { CouriersService } from './couriers.service';
import { GetCouriersResponse } from './couriers.types';

describe('CouriersService - getCouriers', () => {
    const mockClient = {
        request: vi.fn(),
    } as unknown as BiteshipClient;

    const service = new CouriersService(mockClient);

    it('should retrieve couriers successfully', async () => {
        const mockResponse: GetCouriersResponse = {
            success: true,
            object: 'courier',
            couriers: [
                {
                    available_for_cash_on_delivery: false,
                    available_for_proof_of_delivery: false,
                    available_for_instant_waybill_id: true,
                    courier_name: "Grab",
                    courier_code: "grab",
                    courier_service_name: "Instant",
                    courier_service_code: "instant",
                    tier: "premium",
                    description: "On Demand Instant (bike)",
                    service_type: "same_day",
                    shipping_type: "parcel",
                    shipment_duration_range: "1 - 3",
                    shipment_duration_unit: "hours",
                },
            ],
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.getCouriers();

        expect(mockClient.request).toHaveBeenCalledWith('/v1/couriers', {
            method: 'GET',
        });
        expect(result).toEqual(mockResponse);
    });
});
