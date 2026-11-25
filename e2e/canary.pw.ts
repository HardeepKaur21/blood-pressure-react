import { test, expect } from "@playwright/test";

test("Stable group receives the original version", async ({ page }) => {
  await page.goto("/");

  await page.context().addCookies([
    {
      name: "canary_group",
      value: "stable",
      url: page.url(),
    },
  ]);

  const response = await page.reload();

  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-canary-group"]).toBe("stable");

  const button = page.getByRole("button", { name: "Submit" });

  await expect(button).toBeVisible();
  await expect(button).not.toHaveCSS("background-color", "rgb(116, 118, 120)");

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await button.click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});

test("Canary group receives the grey button", async ({ page }) => {
  await page.goto("/");

  await page.context().addCookies([
    {
      name: "canary_group",
      value: "canary",
      url: page.url(),
    },
  ]);

  const response = await page.reload();

  expect(response?.status()).toBe(200);
  expect(response?.headers()["x-canary-group"]).toBe("canary");

  const button = page.getByRole("button", { name: "Submit" });

  await expect(button).toBeVisible();
  await expect(button).toHaveCSS("background-color", "rgb(116, 118, 120)");

  await page.getByLabel("Systolic").fill("110");
  await page.getByLabel("Diastolic").fill("70");

  await button.click();

  await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
});
