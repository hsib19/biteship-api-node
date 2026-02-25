import { describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { MapsService } from './maps.service';
import { SearchAreaResponse } from './maps.types';

describe('MapsService - searchArea', () => {
    const mockClient: BiteshipClient = { request: vi.fn() } as unknown as BiteshipClient;
    const service = new MapsService(mockClient);

    it('should throw error if countries or input missing', async () => {
        await expect(service.searchArea('', 'Jakarta')).rejects.toThrow('countries and input are required');
        await expect(service.searchArea('ID', '')).rejects.toThrow('countries and input are required');
    });

    it('should call client.request with correct URL', async () => {
        const mockResponse: SearchAreaResponse = {
            success: true,
            areas: [
                {
                    id: 'IDNP6IDNC148IDND843IDZ12250',
                    name: 'Pesanggrahan, Jakarta Selatan, DKI Jakarta. 12250',
                    country_name: 'Indonesia',
                    country_code: 'ID',
                    administrative_division_level_1_name: 'DKI Jakarta',
                    administrative_division_level_1_type: 'province',
                    administrative_division_level_2_name: 'Jakarta Selatan',
                    administrative_division_level_2_type: 'city',
                    administrative_division_level_3_name: 'Pesanggrahan',
                    administrative_division_level_3_type: 'district',
                    postal_code: 12250,
                },
            ],
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.searchArea('ID', 'Jakarta Selatan', 'single');

        expect(result).toEqual(mockResponse);
        expect(mockClient.request).toHaveBeenCalledWith(
            '/v1/maps/areas?countries=ID&input=Jakarta%20Selatan&type=single',
            { method: 'GET' }
        );
    });
});
