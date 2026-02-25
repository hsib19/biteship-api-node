export interface ClientRequestOptions<TBody = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: TBody;
}

export interface ClientResponse<T = unknown> {
  data: T;
  message?: string;
  status?: string;
}

export interface BiteshipErrorResponse {
  error?: string;
  [key: string]: unknown;
}
