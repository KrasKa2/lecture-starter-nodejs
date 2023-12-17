import { AbstractFieldValidator } from "./AbstractFieldValidator.js";

export class StringFieldValidtor extends AbstractFieldValidator {
  #isRequired = false;
  #regexp = null;
  #regexpTitle = null;
  #minLength = null;

  required(isRequired = true) {
    this.#isRequired = isRequired;
    return this;
  }

  match(regexp) {
    this.#regexp = regexp;
    return this;
  }

  email(domain = null, regexpTitle = null) {
    const domainRegexp = domain ? domain + "$" : "([\\w-]+.)+[\\w-]{2,4}$";
    this.#regexp = new RegExp("^[\\w-.]+@" + domainRegexp);

    if (regexpTitle) {
      this.#regexpTitle = regexpTitle;
    }

    return this;
  }

  phone(countryCode = null, regexpTitle = null) {
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

  minLength(minLength) {
    this.#minLength = minLength;
    return this;
  }

  #checkType(value) {
    if (value != undefined && typeof value !== "string") {
      this.error = `Field '${this.name}' must be a string!`;
    }
  }

  #checkRequired(value) {
    if (this.#isRequired && !value) {
      this.error = `Field '${this.name}' is required!`;
    }
  }

  #checkRegexp(value) {
    if (this.#regexp && !this.#regexp.test(value)) {
      const regexpTitle = this.#regexpTitle || this.#regexp.toString();
      this.error = `Field '${this.name}' doesn't match '${regexpTitle}'!`;
    }
  }

  #checkMinLength(value) {
    if (this.#minLength && value.length < this.#minLength) {
      this.error = `Field '${this.name}' must has minimum ${
        this.#minLength
      } symbols!`;
    }
  }

  validate(value) {
    this.#checkRequired(value);
    if (value === undefined) return this;

    this.error || this.#checkType(value);
    this.error || this.#checkRequired(value);
    this.error || this.#checkMinLength(value);
    this.error || this.#checkRegexp(value);
    return this;
  }
}
