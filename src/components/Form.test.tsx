import { it, expect, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import Form from "./Form";

afterEach(() => {
  cleanup();
});

describe("Form component", () => {
  it("displays the form inputs and submit button", () => {
    render(<Form />);

    expect(screen.getByLabelText("Systolic")).toBeInTheDocument();
    expect(screen.getByLabelText("Diastolic")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("allows users to enter blood pressure readings", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const systolic = screen.getByLabelText("systolic");
    const diastolic = screen.getByLabelText("diastolic");

    await user.type(systolic, "120");
    await user.type(diastolic, "80");

    expect(systolic).toHaveValue(120);
    expect(diastolic).toHaveValue(80);
  });
});
