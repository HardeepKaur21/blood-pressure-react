import { test, expect } from "@playwright/test";

test("User can calculate ideal blood pressure", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});

test("User can calculate high blood pressure", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Systolic").fill("145");
  await page.getByLabel("Diastolic").fill("75");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("High Blood Pressure")).toBeVisible();
});

test("User can calculate low blood pressure", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Systolic").fill("80");
  await page.getByLabel("Diastolic").fill("40");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Low Blood Pressure")).toBeVisible();
});

test("User can input invalid inputs", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Systolic").fill("200");
  await page.getByLabel("Diastolic").fill("80");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Invalid Input")).toBeVisible();
});

test("User can correct invalid inputs", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Systolic").fill("200");
  await page.getByLabel("Diastolic").fill("80");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Invalid Input")).toBeVisible();

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});
