import { AbstractFieldValidator } from "./AbstractFieldValidator.js";

export class NumberFieldValidtor extends AbstractFieldValidator {
  #isRequired = false;
  #lessOrEqual;
  #moreOrEqual;

  required(isRequired = true) {
    this.#isRequired = isRequired;
    return this;
  }

  lessOrEqual(lessOrEqual) {
    this.#lessOrEqual = lessOrEqual;
    return this;
  }

  moreOrEqual(moreOrEqual) {
    this.#moreOrEqual = moreOrEqual;
    return this;
  }

  #checkType(value) {
    if (value !== undefined && typeof value !== "number") {
      this.error = `Field '${this.name}' must be a number!`;
    }
  }

  #checkRequired(value) {
    if (this.#isRequired && value === undefined) {
      this.error = `Field '${this.name}' is required!`;
    }
  }

  #checkLessOrEqual(value) {
    if (this.#lessOrEqual !== undefined && value > this.#lessOrEqual) {
      this.error = `Field '${this.name}' must be <= ${this.#lessOrEqual}!`;
    }
  }

  #checkMoreOrEqual(value) {
    if (this.#moreOrEqual !== undefined && value < this.#moreOrEqual) {
      this.error = `Field '${this.name}' must be >= ${this.#moreOrEqual}!`;
    }
  }

  validate(value) {
    this.#checkRequired(value);
    if (value === undefined) return this;

    this.error || this.#checkType(value);
    this.error || this.#checkLessOrEqual(value);
    this.error || this.#checkMoreOrEqual(value);
    return this;
  }
}
