import { describe, expect, test } from "@jest/globals";
import { NumberFieldValidtor } from "../middlewares/validator/NumberFieldValidtor";

describe("HealthFieldValidator. health — число, 80 ≤ health ≤ 120, необов’язкове поле", () => {
  const validator = () =>
    new NumberFieldValidtor("health").moreOrEqual(80).lessOrEqual(120);

  test("value = undefined ==> error: is required", () => {
    const value = undefined;
    const error = validator().validate(value).getError();

    expect(error).toBeNull();
  });

  test("value = 'str' ==> error: must be a number", () => {
    const value = "str";
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'health' must be a number!");
  });

  test("value = 10 ==> error: must be >= 80", () => {
    const value = 10;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'health' must be >= 80!");
  });

  test("value = 130 ==> error: must be <= 120", () => {
    const value = 130;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'health' must be <= 120!");
  });
});
