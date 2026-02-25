export type CODDisbursementType = '3_days' | '5_days' | '7_days';

export interface RateItem {
  name: string;
  description?: string;
  value: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  quantity: number;
}

export interface GetRatesRequest {
  origin_area_id?: string;
  destination_area_id?: string;

  origin_latitude?: number;
  origin_longitude?: number;
  destination_latitude?: number;
  destination_longitude?: number;

  origin_postal_code?: number;
  destination_postal_code?: number;

  type?: 'origin_suggestion_to_closest_destination';

  couriers: string;
  items: RateItem[];

  // Optional: insurance
  courier_insurance?: number;

  // Optional: COD
  destination_cash_on_delivery?: number;
  destination_cash_on_delivery_type?: CODDisbursementType;
}

/** Detail locations (origin / destination) */
export interface LocationDetail {
  location_id: string;
  latitude: number;
  longitude: number;
  postal_code: number;
  country_name: string;
  country_code: string;
  administrative_division_level_1_name?: string;
  administrative_division_level_1_type?: string;
  administrative_division_level_2_name?: string;
  administrative_division_level_2_type?: string;
  administrative_division_level_3_name?: string;
  administrative_division_level_3_type?: string;
  administrative_division_level_4_name?: string;
  administrative_division_level_4_type?: string;
  address?: string;
}

/** Pricing detail per courier service */
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

  currency?: string;
  description?: string;
  duration?: string;
  shipment_duration_range?: string;
  shipment_duration_unit?: string;
  service_type?: string;
  shipping_type?: string;

  shipping_fee: number;
  shipping_fee_discount?: number;
  shipping_fee_surcharge?: number;
  insurance_fee?: number;
  cash_on_delivery_fee?: number;
  price: number;
  tax_lines: unknown[];
  type?: string;
}

export interface GetRatesResponse {
  success: boolean;
  object: 'courier_pricing';
  message: string;
  code: number;
  origin: LocationDetail;
  destination: LocationDetail;
  pricing: CourierPricing[];
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

export interface LocationPostal {
  postalCode: number;
}

export interface LocationArea {
  areaId: string;
}

export type LocationMix = Partial<
  LocationCoordinates & LocationPostal & LocationArea
>;

export interface RateOptions {
  insurance?: number;
  cod?: { amount: number; type: CODDisbursementType };
  type?: 'origin_suggestion_to_closest_destination';
}
