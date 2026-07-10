import {test, expect } from "@playwright/test"

test.describe("Home page", () => {
    test.beforeEach(async ({ page }) => {
         await page.goto("https://practicesoftwaretesting.com//");
    })
    test("check sign in", async ({ page }) => {
        await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
    });

    test("validate page title", async ({ page }) => {
        await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
    });

    test("grid loads with 9 items", async ({ page }) => {
        const productGrid = page.locator(".col-md-9");
        await expect(productGrid.getByRole("link")).toHaveCount(9);
        expect (await productGrid.getByRole("link").count()).toBe(9);
    });

    test("search for the hammer", async ({ page }) => {
        const productGrid = page.locator(".col-md-9");
        await expect(page.getByTestId("search-query")).toBeVisible();
        await page.getByTestId("search-query").fill("Thor Hammer");
        await page.getByTestId("search-submit").click();
        await expect(productGrid.getByRole("link")).toHaveCount(1);
        await expect(page.getByAltText("Thor Hammer")).toBeVisible();
    });
});