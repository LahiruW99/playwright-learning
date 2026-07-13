import { test, expect } from "@playwright/test";
import { randomState } from "../../lib/helpers/states"

test('buy now pay later', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.getByRole('img', { name: 'Thor Hammer' }).click();
  await page.getByTestId('add-to-cart').click();
  await page.getByTestId('nav-cart').click();
  await page.getByTestId('proceed-1').click();
  await page.getByTestId('email').fill('customer2@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await page.getByTestId('proceed-2').click();
  await page.getByTestId('country').selectOption(randomState());
  await page.getByTestId('postal_code').fill('1333');
  await page.getByTestId('house_number').fill('34');
  await page.getByTestId('proceed-3').click();
  await page.getByTestId('payment-method').selectOption('buy-now-pay-later');
  await page.getByTestId('monthly_installments').selectOption('3');
  await page.getByTestId('finish').click();
  await expect(page.getByTestId('payment-success-message')).toBeVisible();
  await page.getByTestId('finish').click();
});
