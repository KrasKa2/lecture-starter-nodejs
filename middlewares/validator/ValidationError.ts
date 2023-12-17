export enum ERROR {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export class ValidationError extends Error {
  #code: number;

  constructor(message: string, code: number = ERROR.BAD_REQUEST) {
    super(message);
    this.#code = code;
  }

  get code() {
    return this.#code;
  }

  static badRequestError(message: string) {
    return new ValidationError(message, ERROR.BAD_REQUEST);
  }

  static notFoundError(message: string) {
    return new ValidationError(message, ERROR.NOT_FOUND);
  }
}
