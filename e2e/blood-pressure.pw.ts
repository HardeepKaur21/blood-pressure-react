import { test, expect } from "@playwright/test";

test("User can calculate ideal blood pressure", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});
