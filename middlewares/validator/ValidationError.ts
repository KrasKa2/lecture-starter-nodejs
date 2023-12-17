export class ValidationError extends Error {
  #code: number;

  constructor(message: string, code: number) {
    super(message);
    this.#code = code;
  }

  get code() {
    return this.#code;
  }
}
