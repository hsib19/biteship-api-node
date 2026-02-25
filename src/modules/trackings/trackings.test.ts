import { describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { TrackingsService } from './trackings.service';
import { GetPublicTrackingResponse, GetTrackingResponse, TrackingStatus } from './trackings.types';

describe('TrackingsService - getTrackingById', () => {
    const mockClient = {
        request: vi.fn(),
    } as unknown as BiteshipClient;

    const service = new TrackingsService(mockClient);

    it('should retrieve tracking successfully', async () => {
        const mockResponse: GetTrackingResponse = {
            success: true,
            message: "Successfully get tracking info",
            object: "tracking",
            id: "6051861741a37414e6637fab",
            waybill_id: "0123082100003094",
            courier: {
                company: "grab",
                driver_name: "John Doe",
                driver_phone: "0888888888",
                driver_photo_url: "https://picsum.photos/200",
                driver_plate_number: "B 1234 ABC",
            },
            origin: {
                contact_name: "John Doe",
                address: "Jl. Medan Merdeka Barat, Gambir, Jakarta Pusat",
            },
            destination: {
                contact_name: "Doe John",
                address: "Jl. Medan Merdeka Timur, Gambir, Jakarta Pusat",
            },
            history: [
                {
                    note: "Order has been confirmed. Locating nearest driver to pick up.",
                    service_type: "instant",
                    updated_at: "2021-03-16T18:17:00+07:00",
                    status: TrackingStatus.Confirmed,
                },
            ],
            link: "https://example.com/01803918209312093",
            order_id: "6251863341sa3714e6637fab",
            status: "delivered",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.getTrackingById("6051861741a37414e6637fab");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/trackings/6051861741a37414e6637fab', {
            method: 'GET',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.getTrackingById("")).rejects.toThrow('tracking id is required');
    });

    it('should retrieve public tracking successfully', async () => {
        const mockResponse: GetPublicTrackingResponse = {
            success: true,
            message: "Successfully get tracking info",
            object: "tracking",
            id: "6051861741a37414e6637fab",
            waybill_id: "0123082100003094",
            courier: {
                company: "jne",
                driver_name: "John Doe",
                driver_phone: "08123456789",
                driver_photo_url: null,
                driver_plate_number: null,
            },
            origin: {
                contact_name: "[INSTANT COURIER] BITESHIP/FIE",
                address: "JALAN TANJUNG 16 NO.5, RT.8/RW.2, WEST TANJUNG, SOUTH JAKARTA CITY, JAKARTA, IN",
            },
            destination: {
                contact_name: "ADITARA MADJID",
                address: "THE PAKUBUWONO RESIDENCE, JALAN PAKUBUWONO VI, RW.1, GUNUNG, SOUTH JAKARTA CITY",
            },
            history: [
                {
                    note: "SHIPMENT RECEIVED BY JNE COUNTER OFFICER AT [JAKARTA]",
                    updated_at: "2021-03-16T18:17:00+07:00",
                    status: TrackingStatus.DroppingOff,
                },
            ],
            link: "https://random-courier-tracking-link.com/",
            order_id: "8041821741b38417d6644fbc",
            status: "delivered",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.getPublicTracking("0123082100003094", "jne");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/trackings/0123082100003094/couriers/jne', {
            method: 'GET',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if waybillId or courierCode is missing', async () => {
        await expect(service.getPublicTracking("", "jne")).rejects.toThrow('waybillId and courierCode are required');
        await expect(service.getPublicTracking("0123082100003094", "")).rejects.toThrow('waybillId and courierCode are required');
    });

});
