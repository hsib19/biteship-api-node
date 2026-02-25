import { BiteshipClient } from '../../client/index';
import {
  CODDisbursementType,
  GetRatesRequest,
  GetRatesResponse,
  LocationArea,
  LocationCoordinates,
  LocationMix,
  LocationPostal,
  RateItem,
  RateOptions,
} from './rates.types';

export class RatesService {
  private readonly endpoint = '/v1/rates/couriers';

  constructor(private client: BiteshipClient) {}

  private async request(data: GetRatesRequest): Promise<GetRatesResponse> {
    if (!data.couriers || !data.items?.length) {
      throw new Error('couriers and items are required');
    }
    return this.client.request<GetRatesResponse>(this.endpoint, {
      method: 'POST',
      body: data,
    });
  }

  private buildRequestPayload(
    origin: LocationMix,
    destination: LocationMix,
    couriers: string,
    items: RateItem[],
    options?: RateOptions
  ): GetRatesRequest {
    return {
      origin_postal_code: origin.postalCode,
      origin_area_id: origin.areaId,
      origin_latitude: origin.latitude,
      origin_longitude: origin.longitude,
      destination_postal_code: destination.postalCode,
      destination_area_id: destination.areaId,
      destination_latitude: destination.latitude,
      destination_longitude: destination.longitude,
      couriers,
      items,
      courier_insurance: options?.insurance,
      destination_cash_on_delivery: options?.cod?.amount,
      destination_cash_on_delivery_type: options?.cod?.type,
      type: options?.type,
    };
  }

  async getRatesByCoordinates(
    origin: LocationCoordinates,
    destination: LocationCoordinates,
    couriers: string,
    items: RateItem[],
    options?: RateOptions
  ): Promise<GetRatesResponse> {
    return this.request(
      this.buildRequestPayload(origin, destination, couriers, items, options)
    );
  }

  async getRatesByPostalCode(
    origin: LocationPostal,
    destination: LocationPostal,
    couriers: string,
    items: RateItem[],
    options?: RateOptions
  ): Promise<GetRatesResponse> {
    return this.request(
      this.buildRequestPayload(origin, destination, couriers, items, options)
    );
  }

  async getRatesByAreaId(
    origin: LocationArea,
    destination: LocationArea,
    couriers: string,
    items: RateItem[],
    options?: RateOptions
  ): Promise<GetRatesResponse> {
    return this.request(
      this.buildRequestPayload(origin, destination, couriers, items, options)
    );
  }

  async getRatesByMix(
    origin: LocationMix,
    destination: LocationMix,
    couriers: string,
    items: RateItem[],
    options?: RateOptions
  ): Promise<GetRatesResponse> {
    return this.request(
      this.buildRequestPayload(origin, destination, couriers, items, options)
    );
  }

  async getRatesByType(
    type: 'origin_suggestion_to_closest_destination',
    destination: LocationCoordinates,
    couriers: string,
    items: RateItem[],
    options?: RateOptions
  ): Promise<GetRatesResponse> {
    return this.request(
      this.buildRequestPayload({}, destination, couriers, items, {
        ...options,
        type,
      })
    );
  }

  async getRatesWithInsurance(
    origin: LocationMix,
    destination: LocationMix,
    couriers: string,
    items: RateItem[],
    insuranceValue: number,
    codOptions?: { amount: number; type: CODDisbursementType }
  ): Promise<GetRatesResponse> {
    return this.getRatesByMix(origin, destination, couriers, items, {
      insurance: insuranceValue,
      cod: codOptions,
    });
  }

  async getRatesWithCOD(
    origin: LocationMix,
    destination: LocationMix,
    couriers: string,
    items: RateItem[],
    codOptions: { amount: number; type: CODDisbursementType },
    insuranceValue?: number
  ): Promise<GetRatesResponse> {
    return this.getRatesByMix(origin, destination, couriers, items, {
      insurance: insuranceValue,
      cod: codOptions,
    });
  }
}
