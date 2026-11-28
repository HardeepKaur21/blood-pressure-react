import { test, expect } from "@playwright/test";

for (const group of ["stable", "canary"] as const) {
  test(`${group} version remains consistent after refreshing`, async ({
    page,
    baseURL,
  }) => {
    if (!baseURL) {
      throw new Error("Set the Playwright base URL");
    }

    // Assign the visitor before opening the website
    await page.context().addCookies([
      {
        name: "canary_group",
        value: group,
        url: baseURL,
      },
    ]);

    const loadedAssets: string[] = [];
    const failedAssets: string[] = [];
    const pageErrors: string[] = [];

    page.on("response", (response) => {
      const path = new URL(response.url()).pathname;

      if (path.startsWith("/assets/")) {
        loadedAssets.push(path);

        if (response.status() >= 400) {
          failedAssets.push(path);
        }
      }
    });

    page.on("requestfailed", (request) => {
      const path = new URL(request.url()).pathname;

      if (path.startsWith("/assets/")) {
        failedAssets.push(path);
      }
    });

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    // Open the assigned version
    let response = await page.goto("/");

    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-canary-group"]).toBe(group);

    const button = page.getByRole("button", { name: "Submit" });

    await expect(button).toBeVisible();

    if (group === "canary") {
      await expect(button).toHaveCSS("background-color", "rgb(116, 118, 120)");
    } else {
      await expect(button).not.toHaveCSS(
        "background-color",
        "rgb(116, 118, 120)",
      );
    }

    // Check sticky assignment over five refreshes
    for (let i = 0; i < 5; i++) {
      response = await page.reload();

      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-canary-group"]).toBe(group);

      const cookies = await page.context().cookies();
      const assignment = cookies.find(
        (cookie) => cookie.name === "canary_group",
      );

      expect(assignment?.value).toBe(group);
    }

    // Verify both JS and CSS assets loaded
    expect(loadedAssets.some((path) => path.endsWith(".js"))).toBe(true);
    expect(loadedAssets.some((path) => path.endsWith(".css"))).toBe(true);

    expect(failedAssets).toEqual([]);
    expect(pageErrors).toEqual([]);

    // Verify the calculator still works
    await page.getByLabel("Systolic").fill("110");
    await page.getByLabel("Diastolic").fill("70");

    await button.click();

    await expect(page.getByText("Ideal Blood Pressure")).toBeVisible();
  });
}
