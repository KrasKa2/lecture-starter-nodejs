import { describe, expect, test } from "@jest/globals";
import { StringFieldValidtor } from "../middlewares/validator/StringFieldValidtor.js";

describe("PhoneFieldValidator", () => {
  const validator = () =>
    new StringFieldValidtor("phone").required().phone("[+]380");

  test("value = undefined ==> error: is required", () => {
    const value = undefined;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'phone' is required!");
  });

  test("value = '+380501111111' ==> no errors", () => {
    const value = "+380501111111";
    const error = validator().validate(value).getError();

    expect(error).toBeNull();
  });

  test("value = '+480501111111' ==> doesn't match pattern", () => {
    const value = "+480501111111";
    const error = validator().validate(value).getError();

    expect(error).toMatch("Field 'phone' doesn't match");
  });

  test("value = '+38050111111' ==> doesn't match pattern", () => {
    const value = "+38050111111";
    const error = validator().validate(value).getError();

    expect(error).toMatch("Field 'phone' doesn't match");
  });
});
