import { test } from "@playwright/test";

test("screenshot of layout + about modal", async ({ page }) => {
  await page.goto("/");

  await page.waitForResponse(
    (resp) => resp.url().includes("/api/tweet"),
    { timeout: 15000 }
  ).catch(() => {});

  await page.waitForFunction(
    () => {
      const btn = document.querySelector('button[type="submit"]');
      return btn && btn.textContent === "Generate";
    },
    { timeout: 15000 }
  );

  await page.waitForTimeout(500);
  await page.screenshot({ path: "e2e/screenshots/toolbar-layout.png", fullPage: true });

  // Click About button
  await page.getByRole("button", { name: "About" }).click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: "e2e/screenshots/about-modal.png", fullPage: true });
});
