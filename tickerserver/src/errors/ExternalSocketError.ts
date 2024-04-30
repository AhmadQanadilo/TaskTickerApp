import { CustomError } from "./customError";

export class ExternalServerError extends CustomError {
  statusCode = 503;

  constructor() {
    super('Error Connecting to external server');

    Object.setPrototypeOf(this, ExternalServerError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, status:this.statusCode }];
  }
}
