export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T | string;
}

export interface IController {
  handle(request: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
