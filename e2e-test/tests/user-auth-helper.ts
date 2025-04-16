import { Page, test, expect } from '@playwright/test';

export const registerUser = async (
  page: Page,
  username: string,
  name: string,
  password: string,
): Promise<void> => {
  const navigationBarLoginButton = await page.getByRole('button', {
    name: 'Login',
  });
  navigationBarLoginButton.click();

  const pageLoginHeading = await page.getByRole('heading', { name: 'Login' });
  await expect(pageLoginHeading).toBeVisible();

  await page.getByText('Click to Sign up').click();

  const pageSignUpHeading = await page.getByRole('heading', {
    name: 'Sign up',
  });
  await expect(pageSignUpHeading).toBeVisible();

  await page
    .getByRole('textbox', { name: 'Username', exact: true })
    .fill(username);
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill(name);
  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Sign up' }).click();
};

export const loginUser = async (
  page: Page,
  username: string,
  password: string,
): Promise<void> => {
  const navigationBarLoginButton = await page.getByRole('button', {
    name: 'Login',
  });
  await navigationBarLoginButton.click();

  const pageLoginHeading = await page.getByRole('heading', { name: 'Login' });
  await expect(pageLoginHeading).toBeVisible();

  await page.getByRole('textbox', { name: 'Username' }).fill(username);

  await page.getByRole('textbox', { name: 'Password' }).fill(password);

  await page.getByRole('button', { name: 'Login' }).last().click();
};

export default { registerUser, loginUser };
