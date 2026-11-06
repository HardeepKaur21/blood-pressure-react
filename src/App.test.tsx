import { it, expect, describe, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import App from "./App";

afterEach(() => {
  cleanup();
});

describe("App component", () => {
  it("displays the navigation header", () => {
    render(<App />);

    expect(screen.getByText("BPCalculator")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getAllByText("Privacy")).toHaveLength(2);
  });

  it("displays the blood pressure calculator", () => {
    render(<App />);

    expect(screen.getByText("BP Category Calculator")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });
  it("displays the footer", () => {
    render(<App />);

    expect(screen.getByText(/© 2025 - BPCalculator/)).toBeInTheDocument();
  });
});
