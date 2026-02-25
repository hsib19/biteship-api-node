import { BiteshipClient } from './client/index';
import { RatesService } from './modules/rates/rates.service';

export class Biteship {
  public client: BiteshipClient;

  public rates: RatesService;

  constructor(apiKey: string) {
    this.client = new BiteshipClient(apiKey);

    // Initialize modules
    this.rates = new RatesService(this.client);
  }
}
