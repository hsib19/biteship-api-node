// src/client/modules/draftOrders/DraftOrdersService.test.ts

import { describe, expect, it, vi } from 'vitest';
import { BiteshipClient } from '../../client/index';
import { DraftOrdersService } from './draft-orders.service';
import { ConfirmDraftOrderResponse, CreateDraftOrderRequest, CreateDraftOrderResponse, DeleteDraftOrderResponse, RetrieveDraftOrderRatesResponse, RetrieveDraftOrderResponse, UpdateDraftOrderRequest, UpdateDraftOrderResponse } from './draft-orders.types';

describe('DraftOrdersService - createDraftOrder with courier', () => {
    const mockClient: BiteshipClient = {
        request: vi.fn(),
    } as unknown as BiteshipClient;

    const service = new DraftOrdersService(mockClient);

    it('should throw error if destination fields are missing', async () => {
        const payload: CreateDraftOrderRequest = {
            origin_contact_name: "Amir",
            origin_contact_phone: "081234567890",
            origin_address: "Plaza Senayan",
            destination_contact_name: "",
            destination_contact_phone: "",
            destination_address: "",
            delivery_type: "now",
            items: [
                { name: "Item", value: 1000, quantity: 1, weight: 100 }
            ],
        };

        await expect(service.createDraftOrder(payload)).rejects.toThrow(
            'destination_contact_name, destination_contact_phone, and destination_address are required'
        );
    });

    it('should throw error if delivery_type is missing', async () => {
        const payload: CreateDraftOrderRequest = {
            origin_contact_name: "Amir",
            origin_contact_phone: "081234567890",
            origin_address: "Plaza Senayan",
            destination_contact_name: "John Doe",
            destination_contact_phone: "088888888888",
            destination_address: "Lebak Bulus MRT",
            delivery_type: "" as any,
            items: [
                { name: "Item", value: 1000, quantity: 1, weight: 100 }
            ],
        };

        await expect(service.createDraftOrder(payload)).rejects.toThrow(
            'delivery_type is required'
        );
    });

    it('should throw error if items are missing', async () => {
        const payload: CreateDraftOrderRequest = {
            origin_contact_name: "Amir",
            origin_contact_phone: "081234567890",
            origin_address: "Plaza Senayan",
            destination_contact_name: "John Doe",
            destination_contact_phone: "088888888888",
            destination_address: "Lebak Bulus MRT",
            delivery_type: "now",
            items: [],
        };

        await expect(service.createDraftOrder(payload)).rejects.toThrow(
            'items are required'
        );
    });

    it('should create draft order with courier successfully', async () => {
        const payload: CreateDraftOrderRequest = {
            origin_contact_name: "Amir",
            origin_contact_phone: "081234567890",
            origin_address: "Plaza Senayan, Jalan Asia Afrik...",
            destination_contact_name: "John Doe",
            destination_contact_phone: "088888888888",
            destination_address: "Lebak Bulus MRT...",
            courier_company: "sicepat",
            courier_type: "reg",
            delivery_type: "now",
            items: [
                {
                    name: "Black L",
                    description: "White Shirt",
                    category: "fashion",
                    value: 165000,
                    quantity: 1,
                    height: 10,
                    length: 10,
                    weight: 200,
                    width: 10,
                },
            ],
        };

        const mockResponse: CreateDraftOrderResponse = {
            success: true,
            code: 20111002,
            object: "draft_order",
            id: "ef18275c-02a9-4887-a56b-f374edb96ec4",
            order_id: null,
            origin: {
                area_id: "IDNP6IDNC148IDND836IDNZ12430",
                address: "CITOS - Cilandak Town Square, Kota Jakarta Selatan, Jakarta 12430",
                note: null,
                contact_name: "John Doe",
                contact_phone: "081234567901",
                contact_email: "johndoe@example.com",
                coordinate: { latitude: null, longitude: null },
                province_name: "DKI Jakarta",
                city_name: "Jakarta Selatan",
                district_name: "Cilandak",
                postal_code: 12430,
                collection_method: "pickup",
            },
            destination: {
                area_id: "IDNP6IDNC147IDND835IDNZ10210",
                address: "Jl. Contoh No. 12",
                note: null,
                contact_name: "Jake Doe",
                contact_phone: "0812345678902",
                contact_email: "jakedoe@example.com",
                coordinate: { latitude: null, longitude: null },
                province_name: "DKI Jakarta",
                city_name: "Jakarta Pusat",
                district_name: "Tanah Abang",
                postal_code: 10210,
                proof_of_delivery: { use: false, fee: 0, fee_currency: "IDR", note: null, link: null },
                cash_on_delivery: { payment_method: null, amount: null, amount_currency: "IDR", note: null, type: null },
            },
            courier: {
                name: null,
                phone: null,
                company: "sicepat",
                type: "reg",
                link: null,
                tracking_id: null,
                waybill_id: null,
                insurance: { amount: 0, fee: 0, note: "", amount_currency: "IDR", fee_currency: "IDR" },
                routing_code: null,
            },
            delivery: {
                type: "now",
                datetime: "2024-09-19T03:40:22.810Z",
                note: null,
                distance: null,
                distance_unit: "kilometer",
            },
            items: payload.items,
            currency: "IDR",
            price: 11500,
            status: "ready",
            reference_id: "example/35ef876e-3902-4186-873a-e9012ea1e354",
            invoice_id: "1209839012839012",
            user_id: "6448e9d77ff7510bbadfa605",
            created_at: "2024-09-19T03:40:22.802Z",
            updated_at: "2024-09-19T03:40:22.802Z",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.createDraftOrder(payload);

        expect(mockClient.request).toHaveBeenCalledWith('/v1/draft_orders', {
            method: 'POST',
            body: payload,
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if required fields are missing', async () => {
        const payload: CreateDraftOrderRequest = {
            origin_contact_name: "",
            origin_contact_phone: "",
            origin_address: "",
            destination_contact_name: "",
            destination_contact_phone: "",
            destination_address: "",
            delivery_type: "now",
            items: [],
        };

        await expect(service.createDraftOrder(payload)).rejects.toThrow();
    });

    it('should retrieve draft order successfully', async () => {
        const mockResponse: RetrieveDraftOrderResponse = {
            success: true,
            code: 20011004,
            object: "draft_order",
            id: "ef18275c-02a9-4887-a56b-f374edb96ec4",
            order_id: null,
            origin: {
                area_id: "IDNP6IDNC148IDND836IDNZ12430",
                address: "CITOS - Cilandak Town Square, Kota Jakarta Selatan, Jakarta 12430",
                note: null,
                contact_name: "John Doe",
                contact_phone: "081234567901",
                contact_email: "johndoe@example.com",
                coordinate: { latitude: null, longitude: null },
                province_name: "DKI Jakarta",
                city_name: "Jakarta Selatan",
                district_name: "Cilandak",
                postal_code: 12430,
                collection_method: "pickup",
            },
            destination: {
                area_id: "IDNP6IDNC147IDND835IDNZ10210",
                address: "Jl. Contoh No. 12",
                note: null,
                contact_name: "Jake Doe",
                contact_phone: "0812345678902",
                contact_email: "jakedoe@example.com",
                coordinate: { latitude: null, longitude: null },
                province_name: "DKI Jakarta",
                city_name: "Jakarta Pusat",
                district_name: "Tanah Abang",
                postal_code: 10210,
                proof_of_delivery: { use: false, fee: 0, fee_currency: "IDR", note: null, link: null },
                cash_on_delivery: { payment_method: null, amount: null, amount_currency: "IDR", note: null, type: null },
            },
            courier: {
                name: null,
                phone: null,
                company: "sicepat",
                type: "reg",
                link: null,
                tracking_id: null,
                waybill_id: null,
                insurance: { amount: 0, amount_currency: "IDR", fee: 0, fee_currency: "IDR", note: "" },
                routing_code: null,
            },
            delivery: {
                type: "now",
                datetime: "2024-09-19T03:40:22.810Z",
                note: null,
                distance: null,
                distance_unit: "kilometer",
            },
            extra: [],
            tags: [],
            metadata: null,
            items: [
                {
                    name: "Black Leather Bag",
                    description: "Goods",
                    value: 30,
                    currency: "IDR",
                    quantity: 1,
                    height: 1,
                    width: 1,
                    length: 1,
                    weight: 1,
                },
            ],
            currency: "IDR",
            tax_lines: [],
            price: 11500,
            status: "ready",
            reference_id: "example/35ef876e-3902-4186-873a-e9012ea1e354",
            invoice_id: "1209839012839012",
            user_id: "6448e9d77ff7510bbadfa605",
            created_at: "2024-09-19T03:40:22.802Z",
            updated_at: "2024-09-19T03:40:22.802Z",
            placed_at: null,
            ready_at: "2024-09-19T03:40:22.802Z",
            confirmed_at: null,
            deleted_at: null,
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.retrieveDraftOrder("ef18275c-02a9-4887-a56b-f374edb96ec4");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/draft_orders/ef18275c-02a9-4887-a56b-f374edb96ec4', {
            method: 'GET',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.retrieveDraftOrder("")).rejects.toThrow('draft order id is required');
    });

    it('should retrieve draft order rates successfully', async () => {
        const mockResponse: RetrieveDraftOrderRatesResponse = {
            success: true,
            object: "courier_pricing",
            message: "Success to retrieve courier pricing",
            code: 20001003,
            origin: {
                location_id: null,
                latitude: null,
                longitude: null,
                postal_code: 12430,
                country_name: "Indonesia",
                country_code: "ID",
                administrative_division_level_1_name: "DKI Jakarta",
                administrative_division_level_1_type: "province",
                administrative_division_level_2_name: "Jakarta Selatan",
                administrative_division_level_2_type: "city",
                administrative_division_level_3_name: "Cilandak",
                administrative_division_level_3_type: "district",
                administrative_division_level_4_name: "Cilandak Barat",
                administrative_division_level_4_type: "subdistrict",
                address: null,
            },
            stops: [],
            destination: {
                location_id: null,
                latitude: null,
                longitude: null,
                postal_code: 10210,
                country_name: "Indonesia",
                country_code: "ID",
                administrative_division_level_1_name: "DKI Jakarta",
                administrative_division_level_1_type: "province",
                administrative_division_level_2_name: "Jakarta Pusat",
                administrative_division_level_2_type: "city",
                administrative_division_level_3_name: "Tanah Abang",
                administrative_division_level_3_type: "district",
                administrative_division_level_4_name: "Bendungan Hilir",
                administrative_division_level_4_type: "subdistrict",
                address: null,
            },
            pricing: [
                {
                    available_collection_method: ["pickup"],
                    available_for_cash_on_delivery: false,
                    available_for_proof_of_delivery: false,
                    available_for_instant_waybill_id: true,
                    available_for_insurance: true,
                    company: "grab",
                    courier_name: "GRAB",
                    courier_code: "grab",
                    courier_service_name: "Instant",
                    courier_service_code: "instant",
                    description: "Instant service for on demand needs.",
                    duration: "1 - 3 Hours",
                    shipment_duration_range: "1 - 3",
                    shipment_duration_unit: "hours",
                    service_type: "same_day",
                    shipping_type: "parcel",
                    price: 11000,
                    type: "instant",
                },
            ],
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.retrieveDraftOrderRates("ef18275c-02a9-4887-a56b-f374edb96ec4");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/draft_orders/ef18275c-02a9-4887-a56b-f374edb96ec4/rates', {
            method: 'GET',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.retrieveDraftOrderRates("")).rejects.toThrow('draft order id is required');
    });

    it('should update draft order successfully', async () => {
        const payload: UpdateDraftOrderRequest = {
            courier_company: "sicepat",
            courier_type: "reg",
        };

        const mockResponse: UpdateDraftOrderResponse = {
            success: true,
            code: 20011003,
            object: "draft_order",
            id: "ef18275c-02a9-4887-a56b-f374edb96ec4",
            order_id: null,
            origin: {
                area_id: "IDNP6IDNC148IDND836IDNZ12430",
                address: "CITOS - Cilandak Town Square, Kota Jakarta Selatan, Jakarta 12430",
                note: null,
                contact_name: "John Doe",
                contact_phone: "081234567901",
                contact_email: "johndoe@example.com",
                coordinate: { latitude: null, longitude: null },
                province_name: "DKI Jakarta",
                city_name: "Jakarta Selatan",
                district_name: "Cilandak",
                postal_code: 12430,
                collection_method: "pickup",
            },
            destination: {
                area_id: "IDNP6IDNC147IDND835IDNZ10210",
                address: "Jl. Contoh No. 12",
                note: null,
                contact_name: "Jake Doe",
                contact_phone: "0812345678902",
                contact_email: "jakedoe@example.com",
                coordinate: { latitude: null, longitude: null },
                province_name: "DKI Jakarta",
                city_name: "Jakarta Pusat",
                district_name: "Tanah Abang",
                postal_code: 10210,
                proof_of_delivery: { use: false, fee: 0, note: null, link: null },
                cash_on_delivery: { payment_method: null, amount: null, amount_currency: "IDR", note: null, type: null },
            },
            courier: {
                name: null,
                phone: null,
                company: "sicepat",
                type: "reg",
                link: null,
                tracking_id: null,
                waybill_id: null,
                insurance: { amount: 0, amount_currency: "IDR", fee: 0, fee_currency: "IDR", note: "" },
                routing_code: null,
            },
            delivery: {
                type: "now",
                datetime: "2024-09-19T03:40:22.810Z",
                note: null,
                distance: null,
                distance_unit: "kilometer",
            },
            extra: [],
            tags: [],
            metadata: null,
            items: [
                {
                    name: "Black Leather Bag",
                    description: "Goods",
                    value: 30,
                    quantity: 1,
                    height: 1,
                    width: 1,
                    length: 1,
                    weight: 1,
                },
            ],
            currency: "IDR",
            tax_lines: [],
            price: 11500,
            status: "ready",
            reference_id: "example/35ef876e-3902-4186-873a-e9012ea1e354",
            invoice_id: "1209839012839012",
            user_id: "6448e9d77ff7510bbadfa605",
            created_at: "2024-09-19T03:40:22.802Z",
            updated_at: "2024-09-19T03:40:22.802Z",
            placed_at: null,
            ready_at: "2024-09-19T03:40:22.802Z",
            confirmed_at: null,
            deleted_at: null,
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.updateDraftOrder("ef18275c-02a9-4887-a56b-f374edb96ec4", payload);

        expect(mockClient.request).toHaveBeenCalledWith('/v1/draft_orders/ef18275c-02a9-4887-a56b-f374edb96ec4', {
            method: 'POST',
            body: payload,
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        const payload: UpdateDraftOrderRequest = { courier_company: "sicepat" };
        await expect(service.updateDraftOrder("", payload)).rejects.toThrow('draft order id is required');
    });

    it('should delete draft order successfully', async () => {
        const mockResponse: DeleteDraftOrderResponse = {
            success: true,
            code: 20011006,
            object: "draft_order",
            id: "ef18275c-02a9-4887-a56b-f374edb96ec4",
            message: "Draft order deleted successfully",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.deleteDraftOrder("ef18275c-02a9-4887-a56b-f374edb96ec4");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/draft_orders/ef18275c-02a9-4887-a56b-f374edb96ec4', {
            method: 'DELETE',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.deleteDraftOrder("")).rejects.toThrow('draft order id is required');
    });

    it('should confirm draft order successfully', async () => {
        const mockResponse: ConfirmDraftOrderResponse = {
            success: true,
            message: "Order successfully created",
            object: "order",
            id: "66eba364e2e5a64816928197",
            draft_order_id: "ef18275c-02a9-4887-a56b-f374edb96ec4",
            shipper: {
                name: "Amir",
                email: "amir@example.com",
                phone: "081234567901",
                organization: "Biteship Test",
            },
            origin: {
                contact_name: "John Doe",
                contact_phone: "081234567902",
                coordinate: { latitude: null, longitude: null },
                address: "CITOS - Cilandak Town Square, Kota Jakarta Selatan, Jakarta 12430",
                note: "-",
                postal_code: 12430,
                collection_method: "pickup",
            },
            destination: {
                contact_name: "Jack Doe",
                contact_phone: "081234567903",
                contact_email: "jackdoe@example.com",
                address: "Jl. Contoh No. 123",
                note: "-",
                proof_of_delivery: { use: false, fee: 0, note: null, link: null },
                cash_on_delivery: {
                    id: null,
                    amount: 0,
                    fee: 0,
                    amount_currency: "IDR",
                    fee_currency: "IDR",
                    note: null,
                    type: null,
                    status: null,
                    payment_status: "pending",
                    payment_method: "cash",
                },
                coordinate: { latitude: null, longitude: null },
                postal_code: 10210,
            },
            stops: [],
            courier: {
                tracking_id: "66eba364e2e5a642a092819a",
                waybill_id: "000000000000",
                company: "sicepat",
                name: null,
                phone: null,
                type: "reg",
                link: "https://track.biteship.com?waybill_id=000000000000",
                insurance: { amount: 0, fee: 0, amount_currency: "IDR", fee_currency: "IDR", note: "" },
                routing_code: null,
            },
            delivery: {
                datetime: "2024-09-19T11:07+07:00",
                note: null,
                type: "now",
                distance: null,
                distance_unit: "kilometer",
            },
            reference_id: "0000000000",
            items: [
                {
                    name: "Black Leather Bag",
                    description: "Goods",
                    category: "others",
                    sku: null,
                    value: 30,
                    quantity: 1,
                    length: 1,
                    width: 1,
                    height: 1,
                    weight: 1,
                },
            ],
            extra: [],
            currency: "IDR",
            tax_lines: [],
            price: 11500,
            metadata: null,
            note: null,
            status: "confirmed",
        };

        mockClient.request = vi.fn().mockResolvedValue(mockResponse);

        const result = await service.confirmDraftOrder("ef18275c-02a9-4887-a56b-f374edb96ec4");

        expect(mockClient.request).toHaveBeenCalledWith('/v1/draft_orders/ef18275c-02a9-4887-a56b-f374edb96ec4/confirm', {
            method: 'POST',
        });
        expect(result).toEqual(mockResponse);
    });

    it('should throw error if id is missing', async () => {
        await expect(service.confirmDraftOrder("")).rejects.toThrow('draft order id is required');
    });

});
