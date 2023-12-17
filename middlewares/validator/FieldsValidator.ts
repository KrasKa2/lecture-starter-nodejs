export class FieldsValidator {
  #model: Object;
  //   #data: Object;

  #error: string | null = null;

  #forbidRedundantFields: boolean = false;
  #minCountFields: number = 0;

  constructor(model: Object) {
    this.#model = model;
    // this.#data = data;
  }

  forbidRedundantFields(forbid: boolean = true) {
    this.#forbidRedundantFields = forbid;
    return this;
  }

  minCountFields(count: number) {
    this.#minCountFields = count;
    return this;
  }

  validate(data: Object) {
    this.#checkRedundantFields(data);
    this.#error || this.#checkCountFields(data);
    return this;
  }

  getError(): string | null {
    return this.#error;
  }

  throwError(createError: (msg: string) => Error) {
    if (this.#error) {
      throw createError(this.#error);
    }
  }

  #checkRedundantFields(data: Object) {
    if (!this.#forbidRedundantFields) {
      return;
    }

    const userFields = Object.keys(this.#model).filter(
      (field) => field != "id"
    );

    const redundantFields = Object.keys(data).filter(
      (field) => !userFields.includes(field)
    );

    if (redundantFields.length) {
      this.#error = `Redundant fields: ${redundantFields.join(", ")}`;
    }
  }

  #checkCountFields(data: Object) {
    if (!this.#minCountFields) {
      return;
    }

    if (Object.keys(data).length < this.#minCountFields) {
      this.#error = `Must be at least ${
        this.#minCountFields
      } field for updating!`;
    }
  }
}
