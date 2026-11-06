import { it, expect, describe } from "vitest";
import { calculateResult } from "./calculateResult";

describe("calculateResult", () => {
  it("returns high blood pressure when systolic is high", () => {
    expect(calculateResult(145, 75)).toBe("High Blood Pressure");
  });

  it("returns high blood pressure when diastolic is high", () => {
    expect(calculateResult(110, 95)).toBe("High Blood Pressure");
  });

  it("returns high blood pressure when at systolic boundary", () => {
    expect(calculateResult(140, 75)).toBe("High Blood Pressure");
  });

  it("returns high blood pressure when at diastolic boundary", () => {
    expect(calculateResult(110, 90)).toBe("High Blood Pressure");
  });

  it("returns pre-high blood pressure when systolic is pre-high", () => {
    expect(calculateResult(125, 75)).toBe("Pre-High Blood Pressure");
  });

  it("returns pre-high blood pressure when diastolic is pre-high", () => {
    expect(calculateResult(115, 85)).toBe("Pre-High Blood Pressure");
  });

  it("returns pre-high blood pressure at systolic lower boundary", () => {
    expect(calculateResult(120, 70)).toBe("Pre-High Blood Pressure");
  });

  it("returns pre-high blood pressure at diastolic lower boundary", () => {
    expect(calculateResult(110, 80)).toBe("Pre-High Blood Pressure");
  });

  it("returns pre-high blood pressure at higher boundary both systolic and diastolic", () => {
    expect(calculateResult(139, 89)).toBe("Pre-High Blood Pressure");
  });

  it("returns ideal blood pressure", () => {
    expect(calculateResult(110, 70)).toBe("Ideal Blood Pressure");
  });

  it("returns ideal blood pressure at lower boundaries", () => {
    expect(calculateResult(90, 60)).toBe("Ideal Blood Pressure");
  });

  it("returns ideal blood pressure at mixed inputs", () => {
    expect(calculateResult(85, 70)).toBe("Ideal Blood Pressure");
  });

  it("returns ideal blood pressure at higher boundaries", () => {
    expect(calculateResult(119, 79)).toBe("Ideal Blood Pressure");
  });

  it("returns low blood pressure", () => {
    expect(calculateResult(85, 55)).toBe("Low Blood Pressure");
  });
});
