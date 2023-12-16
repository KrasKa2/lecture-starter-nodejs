import { AbstractFieldValidator } from "./AbstractFieldValidator";

export class StringFieldValidtor extends AbstractFieldValidator {
  #isRequired: boolean = false;
  #regexp: RegExp | null = null;

  required(isRequired: boolean = true): StringFieldValidtor {
    this.#isRequired = isRequired;
    return this;
  }

  match(regexp: RegExp) {
    this.#regexp = regexp;
    return this;
  }

  email(domain: string | null = null) {
    const domainRegexp = domain ? domain + "$" : "([\\w-]+.)+[\\w-]{2,4}$";
    this.#regexp = new RegExp("^[\\w-.]+@" + domainRegexp);
    return this;
  }

  phone(countryCode: string | null = null) {
    const countryCodeRegexp = countryCode
      ? "^" + countryCode
      : "^[+]?[(]?[0-9]{3}[)]?";

    const regexp = countryCodeRegexp + "[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$";
    this.#regexp = new RegExp(regexp);
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
      this.error = `Field '${this.name}' doesn't mutch '${this.#regexp}'!`;
    }
  }

  validate(value: any): StringFieldValidtor {
    this.#checkType(value);
    this.error || this.#checkRequired(value);
    this.error || this.#checkRegexp(value);
    return this;
  }
}
