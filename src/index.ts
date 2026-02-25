import { BiteshipClient } from './client/index';
import { CouriersService } from './modules/couriers/couriers.service';
import { DraftOrdersService } from './modules/draft-orders/draft-orders.service';
import { LocationsService } from './modules/locations/locations.service';
import { MapsService } from './modules/maps/maps.service';
import { OrdersService } from './modules/orders/orders.service';
import { RatesService } from './modules/rates/rates.service';
import { TrackingsService } from './modules/trackings/trackings.service';

export class Biteship {
  public client: BiteshipClient;

  public rates: RatesService;
  public couriers: CouriersService;
  public draft_orders: DraftOrdersService;
  public locations: LocationsService;
  public maps: MapsService;
  public orders: OrdersService;
  public trackings: TrackingsService;

  constructor(apiKey: string) {
    this.client = new BiteshipClient(apiKey);

    // Initialize modules
    this.rates = new RatesService(this.client);
    this.couriers = new CouriersService(this.client);
    this.draft_orders = new DraftOrdersService(this.client);
    this.locations = new LocationsService(this.client);
    this.maps = new MapsService(this.client);
    this.orders = new OrdersService(this.client);
    this.trackings = new TrackingsService(this.client);
  }
}
