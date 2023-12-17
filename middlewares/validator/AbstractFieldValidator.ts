export abstract class AbstractFieldValidator {
  #name: string;
  #error: string | null = null;

  constructor(name: string) {
    this.#name = name;
  }

  get name() {
    return this.#name;
  }

  get error(): string | null {
    return this.#error;
  }

  set error(value: string) {
    this.#error = value;
  }

  getError(): string | null {
    return this.#error;
  }

  throwError(createError: (msg: string) => Error) {
    if (this.#error) {
      throw createError(this.#error);
    }
  }
}

// function checkRequired(name: string, value: any): string | null {
//     if (value === undefined) {
//       return `Field '${name}' is required!`;
//     }
//     return null;
//   }

// export class BooleanFieldValidtor extends AbstractValidator {
//   #isRequired: boolean = false;

//   required(isRequired: boolean = true): BooleanFieldValidtor {
//     this.#isRequired = isRequired;
//     return this;
//   }

//   validate(value: any): BooleanFieldValidtor {
//     this.#isRequired && checkRequired(this.name, value);
//     return this;
//   }
// }
