export interface TrackingCourier {
    company: string;
    name?: string; // Deprecated
    phone?: string; // Deprecated
    driver_name?: string | null;
    driver_phone?: string | null;
    driver_photo_url?: string | null;
    driver_plate_number?: string | null;
}

export interface TrackingOrigin {
    contact_name?: string | null;
    address?: string | null;
}

export interface TrackingDestination {
    contact_name?: string | null;
    address?: string | null;
}

export enum TrackingStatus {
    Confirmed = 'confirmed',
    Allocated = 'allocated',
    PickingUp = 'pickingUp',
    Picked = 'picked',
    DroppingOff = 'droppingOff',
    ReturnInTransit = 'returnInTransit',
    OnHold = 'onHold',
    Delivered = 'delivered',
    Rejected = 'rejected',
    CourierNotFound = 'courierNotFound',
    Returned = 'returned',
    Cancelled = 'cancelled',
    Disposed = 'disposed',
}

export interface TrackingHistory {
    note: string;
    service_type?: string;
    updated_at: string;
    status: TrackingStatus;
}

export interface GetTrackingResponse {
    success: boolean;
    message: string;
    object: 'tracking';
    id: string;
    waybill_id: string;
    courier: TrackingCourier;
    origin: TrackingOrigin;
    destination: TrackingDestination;
    history: TrackingHistory[];
    link?: string | null;
    order_id?: string | null;
    status: string;
}

export interface GetPublicTrackingResponse {
    success: boolean;
    message: string;
    object: 'tracking';
    id: string;
    waybill_id: string;
    courier: TrackingCourier;
    origin: TrackingOrigin;
    destination: TrackingDestination;
    history: TrackingHistory[];
    link?: string | null;
    order_id?: string | null;
    status: string;
}
