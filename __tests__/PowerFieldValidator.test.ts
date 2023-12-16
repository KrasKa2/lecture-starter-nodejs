import { describe, expect, test } from "@jest/globals";
import { NumberFieldValidtor } from "../middlewares/validator/NumberFieldValidtor";

describe("PowerFieldValidator. power — число, 1 ≤ power ≤ 100", () => {
  const validator = () =>
    new NumberFieldValidtor("power").required().moreOrEqual(1).lessOrEqual(100);

  test("value = undefined ==> error: is required", () => {
    const value = undefined;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'power' is required!");
  });

  test("value = 'str' ==> error: must be a number", () => {
    const value = "str";
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'power' must be a number!");
  });

  test("value = 0 ==> error: must be >= 1", () => {
    const value = 0;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'power' must be >= 1!");
  });

  test("value = 103 ==> error: must be <= 100", () => {
    const value = 103;
    const error = validator().validate(value).getError();

    expect(error).toBe("Field 'power' must be <= 100!");
  });
});
