export class FieldsValidator {
  #model

  #error = null;

  #forbidRedundantFields = false;
  #minCountFields = 0;

  constructor(model) {
    this.#model = model;
  }

  forbidRedundantFields(forbid = true) {
    this.#forbidRedundantFields = forbid;
    return this;
  }

  minCountFields(count) {
    this.#minCountFields = count;
    return this;
  }

  validate(data) {
    this.#checkRedundantFields(data);
    this.#error || this.#checkCountFields(data);
    return this;
  }

  getError() {
    return this.#error;
  }

  throwError(createError) {
    if (this.#error) {
      throw createError(this.#error);
    }
  }

  #checkRedundantFields(data) {
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

  #checkCountFields(data) {
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
