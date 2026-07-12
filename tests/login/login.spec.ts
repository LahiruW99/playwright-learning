import { test, expect } from '@playwright/test';
import { LoginPage } from "../../lib/pages/login.page";
import { registerUser } from "../../lib/datafactory/register";

test('login with page object', async ({ page }) => {
  const email = 'customer2@practicesoftwaretesting.com';
  const password = 'welcome01';

  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jack Howe');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
});

test("login with newly registered user", async ({ page }) => {
  const email = `testemaillk${Date.now()}@example.com`;
  const password = 'Test@Lahiru@12';

  await registerUser(email, password)
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(email, password);

  await expect(page.locator('[data-test="nav-menu"]')).toContainText('Test User');
  await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
});
