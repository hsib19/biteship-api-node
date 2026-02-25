export interface CreateOrderRequest {
    shipper_contact_name?: string;
    shipper_contact_phone?: string;
    shipper_contact_email?: string;
    shipper_organization?: string;

    origin_contact_name: string;
    origin_contact_phone: string;
    origin_address: string;
    origin_note?: string;

    destination_contact_name: string;
    destination_contact_phone: string;
    destination_address: string;
    destination_note?: string;

    courier_company: string;
    courier_type: string;
    courier_insurance?: number;

    delivery_type: 'now' | 'scheduled';
    delivery_date?: string;
    delivery_time?: string;

    order_note?: string;
    metadata?: Record<string, unknown>;
    reference_id?: string;
    tags?: string[];

    items: {
        name: string;
        description?: string;
        category?: string;
        value: number;
        quantity: number;
        weight: number;
        height?: number;
        length?: number;
        width?: number;
        sku?: string;
    }[];
}

export interface StandardOrderRequest extends CreateOrderRequest {
    origin_postal_code: number;
    destination_postal_code: number;
}

export interface InstantOrderRequest extends CreateOrderRequest {
    origin_coordinate: { latitude: number; longitude: number };
    destination_coordinate: { latitude: number; longitude: number };
}

export interface CashOnDeliveryOrderRequest extends CreateOrderRequest {
    origin_postal_code: number;
    destination_postal_code: number;
    destination_cash_on_delivery: number;
    destination_cash_on_delivery_type: '7_days' | '5_days' | '3_days';
}

export interface DropOffOrderRequest extends CreateOrderRequest {
    origin_postal_code: number;
    origin_collection_method: 'drop_off';
    destination_postal_code: number;
}

export type OrderStatus =
    | 'confirmed'
    | 'scheduled'
    | 'allocated'
    | 'picking_up'
    | 'picked'
    | 'cancelled'
    | 'on_hold'
    | 'dropping_off'
    | 'return_in_transit'
    | 'returned'
    | 'rejected'
    | 'disposed'
    | 'courier_not_found'
    | 'delivered';

export interface CreateOrderResponse {
    success: true;
    message: string;
    object: 'order';
    id: string;
    draft_order_id: string | null;
    shipper: {
        name: string;
        email: string;
        phone: string;
        organization: string;
    };
    origin: Record<string, unknown>;
    destination: Record<string, unknown>;
    courier: Record<string, unknown>;
    delivery: Record<string, unknown>;
    reference_id?: string | null;
    items: CreateOrderRequest['items'];
    extra: unknown[];
    currency: string;
    tax_lines: unknown[];
    price: number;
    metadata?: Record<string, unknown> | null;
    note?: string | null;
    status: OrderStatus;
}

export interface CreateOrderErrorResponse {
    success: false;
    error: string;
    code: number;
    details?: {
        order_id?: string;
        waybill_id?: string;
        reference_id?: string;
    };
}

export interface RetrieveOrderResponse {
    success: boolean;
    message: string;
    object: 'order';
    id: string;
    draft_order_id: string | null;
    short_id: string | null;

    shipper: {
        name: string | null;
        email: string | null;
        phone: string | null;
        organization: string | null;
    };

    origin: {
        contact_name: string | null;
        contact_phone: string | null;
        address: string | null;
        note: string | null;
        postal_code: number | null;
        coordinate: { latitude: number | null; longitude: number | null } | null;
    };

    destination: {
        contact_name: string | null;
        contact_phone: string | null;
        contact_email: string | null;
        address: string | null;
        note: string | null;
        proof_of_delivery: {
            use: boolean;
            fee: number;
            note: string | null;
            link: string | null;
        } | null;
        postal_code: number | null;
        coordinate: { latitude: number | null; longitude: number | null } | null;
        cash_on_delivery: {
            id: string | null;
            amount: number | null;
            amount_currency: string | null;
            fee: number | null;
            fee_currency: string | null;
            note: string | null;
            type: string | null;
        } | null;
    };

    delivery: {
        datetime: string | null;
        note: string | null;
        type: 'now' | 'scheduled' | null;
        distance: number | null;
        distance_unit: string | null;
    };

    voucher: {
        id: string | null;
        name: string | null;
        value: number | null;
        type: string | null;
    } | null;

    courier: {
        tracking_id: string | null;
        waybill_id: string | null;
        company: string | null;
        history: {
            service_type: string | null;
            status: string;
            note: string | null;
            updated_at: string | null;
        }[];
        link: string | null;
        name: string | null; // Deprecated
        phone: string | null; // Deprecated
        driver_name: string | null;
        driver_phone: string | null;
        driver_photo_url: string | null;
        driver_plate_number: string | null;
        type: string | null;
        shipment_fee: number | null;
        insurance: {
            amount: number | null;
            amount_currency: string | null;
            fee: number | null;
            fee_currency: string | null;
            note: string | null;
        } | null;
        routing_code: string | null;
    };

    reference_id: string | null;
    invoice_id: string | null;
    items: {
        name: string;
        description: string | null;
        sku: string | null;
        value: number;
        quantity: number;
        length: number | null;
        width: number | null;
        height: number | null;
        weight: number;
    }[];

    extra: unknown | null;
    metadata: Record<string, unknown> | null;
    tags: string[];
    note: string | null;
    currency: string;
    tax_lines: unknown[];
    price: number;
    status: string;
    ticket_status: string | null;
}

export interface CancelOrderRequest {
    cancellation_reason_code: string;
    cancellation_reason?: string;
}

export interface CancelOrderResponse {
    success: boolean;
    message: string;
    object: 'order';
    id: string;
    status: 'cancelled' | 'rejected';
    cancellation_reason_code: string;
    cancellation_reason?: string;
}

export interface CancellationReason {
    code: string;
    reason: string;
}

export interface CancellationReasonsResponse {
    success: boolean;
    message: string;
    cancellation_reasons: CancellationReason[];
}
