import { CustomError } from "./customError";

export class InternalSocketError extends CustomError {
  statusCode = 503;

  constructor() {
    super('Internal Server Error');

    Object.setPrototypeOf(this, InternalSocketError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, status:this.statusCode }];
  }
}
