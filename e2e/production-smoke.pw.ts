import { test, expect } from "@playwright/test";

test("production calculator loads and works", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("BP Category Calculator")).toBeVisible();

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});
