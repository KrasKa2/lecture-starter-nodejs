import { describe, expect, test } from "@jest/globals";
import { NumberFieldValidtor } from "../middlewares/validator/NumberFieldValidtor";

// https://swizec.com/blog/how-to-configure-jest-with-typescript/

describe("NumberFieldValidtor", () => {
  test("value = 'string' ==> error: must be a number", () => {
    const value = "string";
    const error = new NumberFieldValidtor("power").validate(value).getError();

    expect(error).toBe("Field 'power' must be a number!");
  });

  test("value = 102 ==> error: must be <= 100", () => {
    const value = 102;
    const error = new NumberFieldValidtor("power")
      .lessOrEqual(100)
      .validate(value)
      .getError();

    expect(error).toBe("Field 'power' must be <= 100!");
  });

  test("value = 0 ==> error: must be >= 1", () => {
    const value = 0;
    const error = new NumberFieldValidtor("power")
      .moreOrEqual(1)
      .validate(value)
      .getError();

    expect(error).toBe("Field 'power' must be >= 1!");
  });
});
