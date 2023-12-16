import { describe, expect, test } from "@jest/globals";
import { StringFieldValidtor } from "../middlewares/validator/StringFieldValidtor";

describe("StringFieldValidtor", () => {
  test("value = ['str'] ==> error", () => {
    const value = ["str"];
    const error = new StringFieldValidtor("name").validate(value).getError();

    expect(error).toBe("Field 'name' must be a string!");
  });

  test("passwd - min 3 symbols. value = '11' ==> error", () => {
    const value = "11";
    const error = new StringFieldValidtor("passwd")
      .required()
      .minLength(3)
      .validate(value)
      .getError();

    expect(error).toBe("Field 'passwd' must has minimum 3 symbols!");
  });

  test("passwd - min 3 symbols. value = '111' ==> no errors", () => {
    const value = "111";
    const error = new StringFieldValidtor("passwd")
      .required()
      .minLength(3)
      .validate(value)
      .getError();

    expect(error).toBeNull();
  });
});

describe("StringFieldValidtor.required()", () => {
  test("value = undefined ==> error", () => {
    const value = undefined;
    const error = new StringFieldValidtor("name")
      .required()
      .validate(value)
      .getError();

    expect(error).toMatch(/name.*required/);
  });

  test("value = '' ==> error", () => {
    const value = "";
    const error = new StringFieldValidtor("name")
      .required()
      .validate(value)
      .getError();

    expect(error).toMatch(/name.*required/);
  });

  test("value = 'string' ==> no errors", () => {
    const value = "string";
    const error = new StringFieldValidtor("name")
      .required()
      .validate(value)
      .getError();

    expect(error).toBeNull();
  });
});

describe("StringFieldValidtor.email()", () => {
  test("value = kraska@gmail.com ==> no errors", () => {
    const value = "kraska@gmail.com";
    const error = new StringFieldValidtor("email")
      .email("gmail.com")
      .validate(value)
      .getError();

    expect(error).toBeNull();
  });

  test("value = kraska@ya.ru ==> error!", () => {
    const value = "kraska@ya.ru";
    const error = new StringFieldValidtor("email")
      .email("gmail.com")
      .validate(value)
      .getError();

    expect(error).toMatch(/Field \'email\' doesn\'t match/);
  });
});
