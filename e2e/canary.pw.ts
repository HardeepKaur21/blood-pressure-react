import { test, expect } from "@playwright/test";

test("Canary release has the updated Submit button", async ({ page }) => {
  await page.goto("/");

  const button = page.getByRole("button", { name: "Submit" });

  await expect(button).toBeVisible();
  await expect(button).toHaveCSS("background-color", "rgb(116, 118, 120)");

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await button.click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});
