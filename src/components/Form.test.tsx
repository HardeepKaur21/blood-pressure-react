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

    const systolic = screen.getByLabelText("Systolic");
    const diastolic = screen.getByLabelText("Diastolic");

    await user.type(systolic, "120");
    await user.type(diastolic, "80");

    expect(systolic).toHaveValue(120);
    expect(diastolic).toHaveValue(80);
  });

  it("displays high blood pressure after submission", async () => {
    const user = userEvent.setup();
    render(<Form />);

    await user.type(screen.getByLabelText("Systolic"), "145");
    await user.type(screen.getByLabelText("Diastolic"), "75");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("High Blood Pressure")).toBeInTheDocument();
  });

  it("displays pre-high blood pressure after submission", async () => {
    const user = userEvent.setup();
    render(<Form />);

    await user.type(screen.getByLabelText("Systolic"), "125");
    await user.type(screen.getByLabelText("Diastolic"), "75");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Pre-High Blood Pressure")).toBeInTheDocument();
  });

  it("displays ideal blood pressure after submission", async () => {
    const user = userEvent.setup();
    render(<Form />);

    await user.type(screen.getByLabelText("Systolic"), "110");
    await user.type(screen.getByLabelText("Diastolic"), "70");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Ideal Blood Pressure")).toBeInTheDocument();
  });

  it("displays low blood pressure after submission", async () => {
    const user = userEvent.setup();
    render(<Form />);

    await user.type(screen.getByLabelText("Systolic"), "85");
    await user.type(screen.getByLabelText("Diastolic"), "55");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Low Blood Pressure")).toBeInTheDocument();
  });

  it("displays an error when the readings are invalid", async () => {
    const user = userEvent.setup();
    render(<Form />);

    await user.type(screen.getByLabelText("Systolic"), "200");
    await user.type(screen.getByLabelText("Diastolic"), "80");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.getByText("Invalid Input")).toBeInTheDocument();
  });

  it("removes the error after submitting corrected readings", async () => {
    const user = userEvent.setup();
    render(<Form />);

    const systolic = screen.getByLabelText("Systolic");
    const diastolic = screen.getByLabelText("Diastolic");
    const button = screen.getByRole("button", { name: "Submit" });

    await user.type(systolic, "200");
    await user.type(diastolic, "80");
    await user.click(button);

    expect(screen.getByText("Invalid Input")).toBeInTheDocument();

    await user.clear(systolic);
    await user.type(systolic, "110");
    await user.clear(diastolic);
    await user.type(diastolic, "70");
    await user.click(button);

    expect(screen.queryByText("Invalid Input")).not.toBeInTheDocument();
    expect(screen.getByText("Ideal Blood Pressure")).toBeInTheDocument();
  });
});
