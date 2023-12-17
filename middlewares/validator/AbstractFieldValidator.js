export class AbstractFieldValidator {
  #name;
  #error = null;

  constructor(name) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get error() {
    return this.#error;
  }

  set error(value) {
    this.#error = value;
  }

  getError() {
    return this.#error;
  }

  throwError(createError) {
    if (this.#error) {
      throw createError(this.#error);
    }
  }
}
