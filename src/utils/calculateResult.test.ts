import { it, expect, describe } from "vitest";
import { calculateResult } from "./calculateResult";

describe("calculateResult", () => {
  it("returns high blood pressure", () => {
    expect(calculateResult(145, 75)).toBe("High Blood Pressure");
  });
});
