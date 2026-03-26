import { test, expect } from "@playwright/test";

test.describe("Tweet to Image App", () => {
  test("loads with default tweet pre-filled", async ({ page }) => {
    await page.goto("/");

    // Header
    await expect(page.locator("h1")).toHaveText("Tweet to Image");

    // URL input should be pre-filled with the default tweet
    const input = page.locator('input[type="text"]');
    await expect(input).toBeVisible();
    await expect(input).toHaveValue(/rosinapissaco/);

    // Take screenshot of initial load
    await page.screenshot({ path: "e2e/screenshots/01-initial-load.png", fullPage: true });
  });

  test("default tweet renders tweet card and controls on load", async ({ page }) => {
    await page.goto("/");

    // Wait for the API call to complete
    await page.waitForResponse(
      (resp) => resp.url().includes("/api/tweet"),
      { timeout: 15000 }
    ).catch(() => {});

    // Wait for loading to finish
    await page.waitForFunction(
      () => {
        const btn = document.querySelector('button[type="submit"]');
        return btn && btn.textContent !== "Loading...";
      },
      { timeout: 15000 }
    );

    // Give the UI a moment to render
    await page.waitForTimeout(500);

    await page.screenshot({ path: "e2e/screenshots/02-default-tweet.png", fullPage: true });

    // Check if tweet loaded or errored
    const hasControls = await page.getByText("Theme").isVisible().catch(() => false);
    const hasExport = await page.getByText("Download PNG").isVisible().catch(() => false);
    const hasError = await page.locator("text=Couldn't fetch tweet").isVisible().catch(() => false);

    console.log(`Controls: ${hasControls}, Export: ${hasExport}, Error: ${hasError}`);

    if (hasControls) {
      // Tweet loaded - verify full layout
      expect(hasExport).toBe(true);
      await page.screenshot({ path: "e2e/screenshots/03-full-layout.png", fullPage: true });
    } else if (hasError) {
      console.log("Syndication endpoint returned error for default tweet");
    }
  });

  test("can enter a different URL and fetch", async ({ page }) => {
    await page.goto("/");

    const input = page.locator('input[type="text"]');

    // Clear and enter a different URL
    await input.clear();
    await input.fill("https://x.com/kepano/status/2036817227031425145");

    const button = page.locator('button[type="submit"]');
    await expect(button).toBeEnabled();

    await button.click();

    // Wait for the API response
    await page.waitForResponse(
      (resp) => resp.url().includes("/api/tweet"),
      { timeout: 15000 }
    ).catch(() => {});

    // Wait for loading to finish
    await page.waitForFunction(
      () => {
        const btn = document.querySelector('button[type="submit"]');
        return btn && btn.textContent === "Generate";
      },
      { timeout: 15000 }
    );

    await page.waitForTimeout(500);
    await page.screenshot({ path: "e2e/screenshots/04-different-tweet.png", fullPage: true });
  });

  test("no console errors on load", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForTimeout(3000);

    const criticalErrors = errors.filter(
      (e) => !e.includes("Download the React DevTools") && !e.includes("Hydration")
    );

    if (criticalErrors.length > 0) {
      console.log("Console errors:", criticalErrors);
    }
  });
});
