// import { describe, expect, test } from "@jest/globals";
// import { StringFieldValidtor } from "../middlewares/validator/StringFieldValidtor.js";
const StringFieldValidtor = require("../middlewares/validator/StringFieldValidtor.js");

describe("EmailFieldValidator", () => {
  const validator = () =>
    new StringFieldValidtor("email").required().email("gmail.com");

  test("value = undefined ==> error: is required", () => {
    const value = undefined;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'email' is required!");
  });

  test("value = kraska@gmail.com ==> no errors", () => {
    const value = "kraska@gmail.com";
    const error = validator().validate(value).getError();

    expect(error).toBeNull();
  });

  test("value = kraska@ya.ru ==> error: doesn't match pattern", () => {
    const value = "kraska@mail.ru";
    const error = validator().validate(value).getError();

    expect(error).toMatch(/Field \'email\' doesn\'t match/);
  });
});
