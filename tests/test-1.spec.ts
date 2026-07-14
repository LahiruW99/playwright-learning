import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/register');
  await page.getByTestId('first-name').fill('Test');
  await page.getByTestId('last-name').fill('User');
  await page.getByTestId('dob').fill('1999-09-12');
  await page.getByTestId('country').selectOption('LK');
  await page.getByTestId('postal_code').fill('12233');
  await page.getByTestId('house_number').fill('123');
  await expect(page.getByTestId("city")).not.toHaveValue("");
  await page.getByTestId('phone').fill('079876767');
  await page.getByTestId('email').fill('usertest3@example.com');
  await page.getByTestId('password').fill('Toiyhsw@34!');
  await page.getByTestId('register-submit').click();
  await expect(page).toHaveURL("https://practicesoftwaretesting.com/auth/login")
});