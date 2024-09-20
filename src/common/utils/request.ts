import { HttpMethods } from '../enums';

export const hasBody = (method: string) =>
  [HttpMethods.POST, HttpMethods.PATCH, HttpMethods.PUT, HttpMethods.DELETE].some(httpMethod => httpMethod === method);
