import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import {
  render,
  screen,
  fireEvent,
  cleanup,
} from "@testing-library/react/pure";
import "@testing-library/jest-dom/vitest";
import { expect } from "vitest";
import Form from "../components/Form";

const feature = await loadFeature("features/bp.feature");

describeFeature(feature, ({ Scenario, AfterEachScenario }) => {
  AfterEachScenario(() => {
    cleanup();
  });

  Scenario("High blood pressure reading", ({ Given, When, And, Then }) => {
    Given("the blood pressure calculator is open", () => {
      render(<Form />);
    });

    When("the user enters systolic 145 and diastolic 75", () => {
      fireEvent.change(screen.getByLabelText("Systolic"), {
        target: { value: "145" },
      });

      fireEvent.change(screen.getByLabelText("Diastolic"), {
        target: { value: "75" },
      });
    });

    And("the user submits the form", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );
    });

    Then('the result should be "High Blood Pressure"', () => {
      expect(screen.getByText("High Blood Pressure")).toBeInTheDocument();
    });
  });

  Scenario("Ideal blood pressure reading", ({ Given, When, And, Then }) => {
    Given("the blood pressure calculator is open", () => {
      render(<Form />);
    });

    When("the user enters systolic 110 and diastolic 70", () => {
      fireEvent.change(screen.getByLabelText("Systolic"), {
        target: { value: "110" },
      });

      fireEvent.change(screen.getByLabelText("Diastolic"), {
        target: { value: "70" },
      });
    });

    And("the user submits the form", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );
    });

    Then('the result should be "Ideal Blood Pressure"', () => {
      expect(screen.getByText("Ideal Blood Pressure")).toBeInTheDocument();
    });
  });

  Scenario("Invalid blood pressure reading", ({ Given, When, And, Then }) => {
    Given("the blood pressure calculator is open", () => {
      render(<Form />);
    });

    When("the user enters systolic 200 and diastolic 80", () => {
      fireEvent.change(screen.getByLabelText("Systolic"), {
        target: { value: "200" },
      });

      fireEvent.change(screen.getByLabelText("Diastolic"), {
        target: { value: "80" },
      });
    });

    And("the user submits the form", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );
    });

    Then('the application should display "Invalid Input"', () => {
      expect(screen.getByText("Invalid Input")).toBeInTheDocument();
    });
  });

  Scenario("Correcting an invalid reading", ({ Given, When, And, Then }) => {
    Given("the blood pressure calculator is open", () => {
      render(<Form />);
    });

    When("the user enters systolic 200 and diastolic 80", () => {
      fireEvent.change(screen.getByLabelText("Systolic"), {
        target: { value: "200" },
      });

      fireEvent.change(screen.getByLabelText("Diastolic"), {
        target: { value: "80" },
      });
    });

    And("the user submits the form", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );
    });

    Then('the application should display "Invalid Input"', () => {
      expect(screen.getByText("Invalid Input")).toBeInTheDocument();
    });

    When("the user changes systolic to 110 and diastolic to 70", () => {
      fireEvent.change(screen.getByLabelText("Systolic"), {
        target: { value: "110" },
      });

      fireEvent.change(screen.getByLabelText("Diastolic"), {
        target: { value: "70" },
      });
    });

    And("the user submits the corrected reading", () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );
    });

    Then('the result should be "Ideal Blood Pressure"', () => {
      expect(screen.getByText("Ideal Blood Pressure")).toBeInTheDocument();
    });
  });
});
