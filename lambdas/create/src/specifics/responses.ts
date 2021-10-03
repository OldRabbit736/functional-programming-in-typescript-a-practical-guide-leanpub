import { Response } from "../../../../util/domain/types";

export const okResponse = (message: string): Response => ({
  statusCode: 200,
  body: message,
});

export const badRequestResponse = (err: string): Response => ({
  statusCode: 400,
  body: err,
});
