import { AbstractFieldValidator } from "./AbstractFieldValidator";

export class NumberFieldValidtor extends AbstractFieldValidator {
  #isRequired: boolean = false;
  #lessOrEqual: number | undefined;
  #moreOrEqual: number | undefined;

  required(isRequired: boolean = true): NumberFieldValidtor {
    this.#isRequired = isRequired;
    return this;
  }

  lessOrEqual(lessOrEqual: number) {
    this.#lessOrEqual = lessOrEqual;
    return this;
  }

  moreOrEqual(moreOrEqual: number) {
    this.#moreOrEqual = moreOrEqual;
    return this;
  }

  #checkType(value: any) {
    if (value !== undefined && typeof value !== "number") {
      this.error = `Field '${this.name}' must be a number!`;
    }
  }

  #checkRequired(value: number | undefined) {
    if (this.#isRequired && value === undefined) {
      this.error = `Field '${this.name}' is required!`;
    }
  }

  #checkLessOrEqual(value: number) {
    if (this.#lessOrEqual !== undefined && value > this.#lessOrEqual) {
      this.error = `Field '${this.name}' must be <= ${this.#lessOrEqual}!`;
    }
  }

  #checkMoreOrEqual(value: number) {
    if (this.#moreOrEqual !== undefined && value < this.#moreOrEqual) {
      this.error = `Field '${this.name}' must be >= ${this.#moreOrEqual}!`;
    }
  }

  validate(value: any): NumberFieldValidtor {
    this.#checkType(value);
    this.error || this.#checkRequired(value);
    this.error || this.#checkLessOrEqual(value);
    this.error || this.#checkMoreOrEqual(value);
    return this;
  }
}
