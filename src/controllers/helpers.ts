import { HttpStatusCode } from "./protocols";

export const ok = (body: any) => ({ statusCode: HttpStatusCode.OK, body });

export const created = (body: any) => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string) => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: message,
  };
};

export const notFound = (entity: string) => ({
  statusCode: 404,
  body: `${entity}'s not found,`,
});

export const serverError = () => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: "Server internal error.",
});
