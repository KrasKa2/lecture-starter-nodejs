import { AbstractFieldValidator } from "./AbstractFieldValidator";

export class StringFieldValidtor extends AbstractFieldValidator {
  #isRequired: boolean = false;
  #regexp: RegExp | null = null;
  #regexpTitle: string | null = null;
  #minLength: number | null = null;

  required(isRequired: boolean = true): StringFieldValidtor {
    this.#isRequired = isRequired;
    return this;
  }

  match(regexp: RegExp) {
    this.#regexp = regexp;
    return this;
  }

  email(domain: string | null = null, regexpTitle: string | null = null) {
    const domainRegexp = domain ? domain + "$" : "([\\w-]+.)+[\\w-]{2,4}$";
    this.#regexp = new RegExp("^[\\w-.]+@" + domainRegexp);

    if (regexpTitle) {
      this.#regexpTitle = regexpTitle;
    }

    return this;
  }

  phone(countryCode: string | null = null, regexpTitle: string | null = null) {
    const countryCodeRegexp = countryCode ? "^" + countryCode : "^[+][0-9]{3}";

    const regexp = countryCodeRegexp + "[0-9]{9}$";
    this.#regexp = new RegExp(regexp);

    if (regexpTitle) {
      this.#regexpTitle = regexpTitle;
    } else {
      this.#regexpTitle = "+XXXXXXXXXXXX";
    }

    return this;
  }

  minLength(minLength: number) {
    this.#minLength = minLength;
    return this;
  }

  #checkType(value: any) {
    if (value != undefined && typeof value !== "string") {
      this.error = `Field '${this.name}' must be a string!`;
    }
  }

  #checkRequired(value: string | undefined) {
    if (this.#isRequired && !value) {
      this.error = `Field '${this.name}' is required!`;
    }
  }

  #checkRegexp(value: string) {
    if (this.#regexp && !this.#regexp.test(value)) {
      const regexpTitle = this.#regexpTitle || this.#regexp.toString();
      this.error = `Field '${this.name}' doesn't match '${regexpTitle}'!`;
    }
  }

  #checkMinLength(value: string) {
    if (this.#minLength && value.length < this.#minLength) {
      this.error = `Field '${this.name}' must has minimum ${
        this.#minLength
      } symbols!`;
    }
  }

  validate(value: any): StringFieldValidtor {
    this.#checkRequired(value);
    if (value === undefined) return this;

    this.error || this.#checkType(value);
    this.error || this.#checkRequired(value);
    this.error || this.#checkMinLength(value);
    this.error || this.#checkRegexp(value);
    return this;
  }
}
