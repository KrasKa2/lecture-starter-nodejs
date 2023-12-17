export const BAD_REQUEST_ERROR = 400;

export class ValidationError extends Error {
  #code: number;

  constructor(message: string, code: number = BAD_REQUEST_ERROR) {
    super(message);
    this.#code = code;
  }

  get code() {
    return this.#code;
  }
}
