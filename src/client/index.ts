import { BiteshipErrorResponse, ClientRequestOptions } from './types';

export class BiteshipClient {
  constructor(
    private apiKey: string,
    private baseURL: string = 'https://api.biteship.com'
  ) {
    if (!apiKey) throw new Error('BITESHIP_API_KEY is required');
  }

  public async request<T>(
    path: string,
    options?: ClientRequestOptions
  ): Promise<T> {
    const url = `${this.baseURL}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiKey}`,
    };

    const res = await fetch(url, {
      method: options?.method || 'GET',
      headers,
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as BiteshipErrorResponse;

      const message = err.error ?? res.statusText;

      throw Object.assign(new Error(message), {
        status: res.status,
        details: err,
      });
    }

    return res.json() as Promise<T>;
  }
}
