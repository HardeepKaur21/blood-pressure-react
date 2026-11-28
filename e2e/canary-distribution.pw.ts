import { test, expect } from "@playwright/test";

test("New visitors receive approximately 90/10 canary allocation", async ({
  page,
}) => {
  test.setTimeout(120000);

  const totalVisitors = 200;
  let stableCount = 0;
  let canaryCount = 0;

  for (let i = 0; i < totalVisitors; i++) {
    // Simulate a new visitor without an assignment cookie
    await page.context().clearCookies();

    // Request the routing Preview without loading the full UI
    const response = await page.request.get("/");

    expect(response.status()).toBe(200);

    const group = response.headers()["x-canary-group"];

    if (group === "stable") {
      stableCount++;
    } else if (group === "canary") {
      canaryCount++;
    } else {
      throw new Error(`Unexpected canary group: ${group}`);
    }
  }

  const stablePercentage = (stableCount / totalVisitors) * 100;
  const canaryPercentage = (canaryCount / totalVisitors) * 100;

  console.log(`Stable: ${stableCount} visitors (${stablePercentage}%)`);
  console.log(`Canary: ${canaryCount} visitors (${canaryPercentage}%)`);

  expect(stableCount + canaryCount).toBe(totalVisitors);
});
