export interface CreateLocationRequest {
    name: string;
    contact_name: string;
    contact_phone: string;
    address: string;
    note?: string;
    postal_code: string;
    latitude: string;
    longitude: string;
    type: 'origin' | 'destination';
}

export interface CreateLocationResponse {
    success: boolean;
    id: string;
    name: string;
    contact_name: string;
    contact_phone: string;
    address: string;
}

export interface GetLocationResponse {
    success: boolean;
    id: string;
    name: string;
    contact_name: string;
    contact_phone: string;
    address: string;
}

export interface UpdateLocationRequest {
    name?: string;
    contact_name?: string;
    contact_phone?: string;
    address?: string;
    note?: string;
    postal_code?: string;
    latitude?: string;
    longitude?: string;
    type?: 'origin' | 'destination';
}

export interface UpdateLocationResponse {
    success: boolean;
    id: string;
    name: string;
    contact_name: string;
    contact_phone: string;
    address: string;
}

export interface DeleteLocationResponse {
    success: boolean;
    id: string;
    message: string;
}
