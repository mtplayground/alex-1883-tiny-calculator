import { expect, test, type Page } from '@playwright/test';

const displayValue = '.calculator-display__value';

async function press(page: Page, name: string) {
  await page.getByRole('button', { name, exact: true }).click();
}

test('completes a calculation, clears, and re-enters a new expression', async ({ page }) => {
  await page.goto('/');

  await press(page, '1');
  await press(page, '2');
  await press(page, 'Add');
  await press(page, '7');
  await press(page, 'Multiply');
  await press(page, '3');
  await press(page, 'Equals');

  await expect(page.locator(displayValue)).toHaveText('57');

  await press(page, 'Clear');
  await expect(page.locator(displayValue)).toHaveText('0');

  await press(page, '8');
  await press(page, 'Divide');
  await press(page, '2');
  await press(page, 'Equals');

  await expect(page.locator(displayValue)).toHaveText('4');
});
