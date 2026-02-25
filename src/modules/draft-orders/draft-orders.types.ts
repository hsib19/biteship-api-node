export interface DraftOrderItem {
    name: string;
    description?: string;
    category?:
    | 'fashion'
    | 'healthcare'
    | 'food_and_drink'
    | 'electronic'
    | 'beauty'
    | 'outdoor_gear'
    | 'home_accessories'
    | 'hobby'
    | 'collection'
    | 'sparepart'
    | 'groceries'
    | 'frozen_food'
    | 'others';
    sku?: string;
    value: number;
    quantity: number;
    weight: number;
    height?: number;
    length?: number;
    currency?: string;
    width?: number;
}

export interface Coordinate {
    latitude: number | null;
    longitude: number | null;
}

export interface OriginResponse {
    area_id: string;
    address: string;
    note: string | null;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    coordinate: Coordinate;
    province_name: string;
    city_name: string;
    district_name: string;
    postal_code: number;
    collection_method: 'pickup' | 'drop_off';
}

export interface DestinationResponse {
    area_id: string;
    address: string;
    note: string | null;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
    coordinate: Coordinate;
    province_name: string;
    city_name: string;
    district_name: string;
    postal_code: number;
    proof_of_delivery: {
        use: boolean;
        fee: number;
        fee_currency: string;
        note: string | null;
        link: string | null;
    };
    cash_on_delivery: {
        payment_method: string | null;
        amount: number | null;
        amount_currency: string;
        note: string | null;
        type: string | null;
    };
}

export interface CourierResponse {
    name: string | null;
    phone: string | null;
    company: string;
    type: string;
    link: string | null;
    tracking_id: string | null;
    waybill_id: string | null;
    insurance: {
        amount: number;
        fee: number;
        note: string;
        amount_currency: string;
        fee_currency: string;
    };
    routing_code: string | null;
}

export interface DeliveryResponse {
    type: 'now' | 'scheduled';
    datetime: string;
    note: string | null;
    distance: number | null;
    distance_unit: string;
}

export type DraftOrderStatus = 'placed' | 'ready' | 'confirmed';

export interface CreateDraftOrderRequest {
    origin_contact_name: string;
    origin_contact_phone: string;
    origin_address: string;
    origin_note?: string;
    origin_postal_code?: number;
    origin_coordinate?: Coordinate;

    destination_contact_name: string;
    destination_contact_phone: string;
    destination_contact_email?: string;
    destination_address: string;
    destination_note?: string;
    destination_postal_code?: number;
    destination_coordinate?: Coordinate;

    courier_company?: string;
    courier_type?: string;

    delivery_type: 'now' | 'scheduled';
    delivery_date?: string;
    delivery_time?: string;

    order_note?: string;
    metadata?: Record<string, unknown>;
    reference_id?: string;
    tags?: string[];

    items: DraftOrderItem[];
}

export interface CreateDraftOrderResponse {
    success: boolean;
    code: number;
    object: 'draft_order';
    id: string;
    order_id: string | null;
    origin: OriginResponse;
    destination: DestinationResponse;
    courier: CourierResponse;
    delivery: DeliveryResponse;
    items: DraftOrderItem[];
    currency: string;
    price: number;
    status: DraftOrderStatus;
    reference_id?: string;
    invoice_id?: string;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
}

export interface RetrieveDraftOrderResponse {
    success: boolean;
    code: number;
    object: 'draft_order';
    id: string;
    order_id: string | null;
    origin: OriginResponse;
    destination: DestinationResponse;
    courier: CourierResponse;
    delivery: DeliveryResponse;
    extra: unknown[];
    tags: string[];
    metadata: Record<string, unknown> | null;
    items: DraftOrderItem[];
    currency: string;
    tax_lines: unknown[];
    price: number;
    status: DraftOrderStatus;
    reference_id?: string;
    invoice_id?: string;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    placed_at?: string | null;
    ready_at?: string | null;
    confirmed_at?: string | null;
    deleted_at?: string | null;
}

export interface LocationResponse {
    location_id: string | null;
    latitude: number | null;
    longitude: number | null;
    postal_code: number;
    country_name: string;
    country_code: string;
    administrative_division_level_1_name: string;
    administrative_division_level_1_type: string;
    administrative_division_level_2_name: string;
    administrative_division_level_2_type: string;
    administrative_division_level_3_name: string;
    administrative_division_level_3_type: string;
    administrative_division_level_4_name: string;
    administrative_division_level_4_type: string;
    address: string | null;
}

export interface CourierPricing {
    available_collection_method: string[];
    available_for_cash_on_delivery: boolean;
    available_for_proof_of_delivery: boolean;
    available_for_instant_waybill_id: boolean;
    available_for_insurance: boolean;
    company: string;
    courier_name: string;
    courier_code: string;
    courier_service_name: string;
    courier_service_code: string;
    description: string;
    duration: string;
    shipment_duration_range: string;
    shipment_duration_unit: string;
    service_type: string;
    shipping_type: string;
    price: number;
    type: string;
}

export interface RetrieveDraftOrderRatesResponse {
    success: boolean;
    object: 'courier_pricing';
    message: string;
    code: number;
    origin: LocationResponse;
    stops: LocationResponse[];
    destination: LocationResponse;
    pricing: CourierPricing[];
}

export interface UpdateDraftOrderRequest {
    shipper_contact_name?: string;
    shipper_contact_phone?: string;
    shipper_contact_email?: string;
    shipper_organization?: string;

    origin_contact_name?: string;
    origin_contact_phone?: string;
    origin_contact_email?: string;
    origin_address?: string;
    origin_note?: string;
    origin_postal_code?: number;
    origin_coordinate?: {
        latitude: number;
        longitude: number;
    };
    origin_collection_method?: 'pickup' | 'drop_off';

    destination_contact_name?: string;
    destination_contact_phone?: string;
    destination_contact_email?: string;
    destination_address?: string;
    destination_note?: string;
    destination_postal_code?: number;
    destination_coordinate?: {
        latitude: number;
        longitude: number;
    };
    destination_cash_on_delivery?: number;
    destination_cash_on_delivery_type?: '7_days' | '5_days' | '3_days';
    destination_proof_of_delivery?: boolean;
    destination_proof_of_delivery_note?: string;

    courier_company?: string;
    courier_type?: string;
    courier_insurance?: number;

    delivery_type?: 'now' | 'scheduled';
    delivery_date?: string;
    delivery_time?: string;

    order_note?: string;
    metadata?: Record<string, unknown>;
    reference_id?: string;
    tags?: string[];

    items?: {
        name?: string;
        description?: string;
        category?:
        | 'fashion'
        | 'healthcare'
        | 'food_and_drink'
        | 'electronic'
        | 'beauty'
        | 'outdoor_gear'
        | 'home_accessories'
        | 'hobby'
        | 'collection'
        | 'sparepart'
        | 'groceries'
        | 'frozen_food'
        | 'others';
        sku?: string;
        value?: number;
        quantity?: number;
        weight?: number;
        height?: number;
        length?: number;
        width?: number;
    }[];
}

export interface UpdateDraftOrderResponse {
    success: boolean;
    code: number;
    object: 'draft_order';
    id: string;
    order_id: string | null;

    origin: {
        area_id: string;
        address: string;
        note: string | null;
        contact_name: string;
        contact_phone: string;
        contact_email: string;
        coordinate: { latitude: number | null; longitude: number | null };
        province_name: string;
        city_name: string;
        district_name: string;
        postal_code: number;
        collection_method: 'pickup' | 'drop_off';
    };

    destination: {
        area_id: string;
        address: string;
        note: string | null;
        contact_name: string;
        contact_phone: string;
        contact_email: string;
        coordinate: { latitude: number | null; longitude: number | null };
        province_name: string;
        city_name: string;
        district_name: string;
        postal_code: number;
        proof_of_delivery: {
            use: boolean;
            fee: number;
            note: string | null;
            link: string | null;
        };
        cash_on_delivery: {
            payment_method: string | null;
            amount: number | null;
            amount_currency: string;
            note: string | null;
            type: string | null;
        };
    };

    courier: {
        name: string | null;
        phone: string | null;
        company: string;
        type: string;
        link: string | null;
        tracking_id: string | null;
        waybill_id: string | null;
        insurance: {
            amount: number;
            amount_currency: string;
            fee: number;
            fee_currency: string;
            note: string;
        };
        routing_code: string | null;
    };

    delivery: {
        type: 'now' | 'scheduled';
        datetime: string;
        note: string | null;
        distance: number | null;
        distance_unit: string;
    };

    extra: unknown[];
    tags: string[];
    metadata: Record<string, unknown> | null;

    items: {
        name: string;
        description: string;
        value: number;
        quantity: number;
        height: number;
        width: number;
        length: number;
        weight: number;
    }[];

    currency: string;
    tax_lines: unknown[];
    price: number;
    status: 'placed' | 'ready' | 'confirmed';
    reference_id?: string;
    invoice_id?: string;
    user_id?: string;
    created_at?: string;
    updated_at?: string;
    placed_at?: string | null;
    ready_at?: string | null;
    confirmed_at?: string | null;
    deleted_at?: string | null;
}

export interface DeleteDraftOrderResponse {
    success: boolean;
    code: number;
    object: 'draft_order';
    id: string;
    message?: string;
}

export interface ConfirmDraftOrderResponse {
    success: boolean;
    message: string;
    object: 'order';
    id: string;
    draft_order_id: string;

    shipper: {
        name: string;
        email: string;
        phone: string;
        organization: string;
    };

    origin: {
        contact_name: string;
        contact_phone: string;
        coordinate: { latitude: number | null; longitude: number | null };
        address: string;
        note: string | null;
        postal_code: number;
        collection_method: 'pickup' | 'drop_off';
    };

    destination: {
        contact_name: string;
        contact_phone: string;
        contact_email: string;
        address: string;
        note: string | null;
        proof_of_delivery: {
            use: boolean;
            fee: number;
            note: string | null;
            link: string | null;
        };
        cash_on_delivery: {
            id: string | null;
            amount: number;
            fee: number;
            amount_currency: string;
            fee_currency: string;
            note: string | null;
            type: string | null;
            status: string | null;
            payment_status: string;
            payment_method: string;
        };
        coordinate: { latitude: number | null; longitude: number | null };
        postal_code: number;
    };

    stops: unknown[];

    courier: {
        tracking_id: string;
        waybill_id: string;
        company: string;
        name: string | null;
        phone: string | null;
        type: string;
        link: string | null;
        insurance: {
            amount: number;
            fee: number;
            amount_currency: string;
            fee_currency: string;
            note: string;
        };
        routing_code: string | null;
    };

    delivery: {
        datetime: string;
        note: string | null;
        type: 'now' | 'scheduled';
        distance: number | null;
        distance_unit: string;
    };

    reference_id: string;

    items: {
        name: string;
        description: string;
        category: string;
        sku: string | null;
        value: number;
        quantity: number;
        length: number;
        width: number;
        height: number;
        weight: number;
    }[];

    extra: unknown[];
    currency: string;
    tax_lines: unknown[];
    price: number;
    metadata: Record<string, unknown> | null;
    note: string | null;
    status: 'confirmed';
}
