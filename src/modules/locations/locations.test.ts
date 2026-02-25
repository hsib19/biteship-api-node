import { describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { LocationsService } from './locations.service';
import { CreateLocationRequest, CreateLocationResponse, DeleteLocationResponse, GetLocationResponse, UpdateLocationRequest, UpdateLocationResponse } from './locations.types';

describe('LocationsService', () => {
    const mockClient = {
        request: vi.fn(),
    } as unknown as BiteshipClient;

    const service = new LocationsService(mockClient);

    it('should call client.request with correct payload', async () => {
        const payload: CreateLocationRequest = {
            name: "Apotik Gambir",
            contact_name: "Ahmad",
            contact_phone: "08123456789",
            address: "Jl. Gambir Selatan no 5. Blok F 92. Jakarta Pusat.",
            note: "Dekat tulisan warung Bu Indah",
            postal_code: "10110",
            latitude: "-6.232123121",
            longitude: "102.22189911",
            type: "origin",
        };

        const mockResponse: CreateLocationResponse = {
            success: true,
            id: "61d565c69a3211036a05f3f8",
            name: "Apotik Gambir",
            contact_name: "Ahmad",
            contact_phone: "08123456789",
            address: "Jl. Gambir Selatan no 5. Blok F 92. Jakarta Pusat.",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.createLocation(payload);

        expect(mockClient.request).toHaveBeenCalledWith('/v1/locations', {
            method: 'POST',
            body: payload,
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if required fields are missing', async () => {
        const badPayload = {
            name: "",
            contact_name: "",
            contact_phone: "",
            address: "",
            postal_code: "10110",
            latitude: "-6.232123121",
            longitude: "102.22189911",
            type: "origin",
        } as CreateLocationRequest;

        await expect(service.createLocation(badPayload)).rejects.toThrow(
            'name, contact_name, contact_phone, and address are required'
        );
    });

    it('should retrieve a location by id', async () => {
        const mockResponse: GetLocationResponse = {
            success: true,
            id: "61d565c69a3211036a05f3f8",
            name: "Apotek Gambir",
            contact_name: "Ahmad",
            contact_phone: "08123456789",
            address: "Jl. Gambir Selatan no 5. Blok F 92. Jakarta Pusat.",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.getLocationById("61d565c69a3211036a05f3f8");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/locations/61d565c69a3211036a05f3f8', {
            method: 'GET',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.getLocationById("")).rejects.toThrow('location id is required');
    });

    it('should update a location successfully', async () => {
        const payload: UpdateLocationRequest = {
            name: "Apotik Monas",
        };

        const mockResponse: UpdateLocationResponse = {
            success: true,
            id: "61d565c69a3211036a05f3f8",
            name: "Apotek Monas",
            contact_name: "Ahmad",
            contact_phone: "08123456789",
            address: "Jl. Gambir Selatan no 5. Blok F 92. Jakarta Pusat.",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.updateLocation("61d565c69a3211036a05f3f8", payload);

        expect(mockClient.request).toHaveBeenCalledWith('/v1/locations/61d565c69a3211036a05f3f8', {
            method: 'POST',
            body: payload,
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        const payload: UpdateLocationRequest = { name: "Apotik Monas" };
        await expect(service.updateLocation("", payload)).rejects.toThrow('location id is required');
    });

    it('should delete a location successfully', async () => {
        const mockResponse: DeleteLocationResponse = {
            success: true,
            id: "61d565c69a3211036a05f3f8",
            message: "Location successfully been removed",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.deleteLocation("61d565c69a3211036a05f3f8");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/locations/61d565c69a3211036a05f3f8', {
            method: 'DELETE',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.deleteLocation("")).rejects.toThrow('location id is required');
    });

});
