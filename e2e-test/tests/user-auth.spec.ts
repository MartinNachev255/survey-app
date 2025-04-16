import { test, expect } from '@playwright/test';
import userAuthHelper from './user-auth-helper';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test.describe('User authentication', () => {
  test('User can register with valid credentials', async ({ page }) => {
    await userAuthHelper.registerUser(page, 'user', 'user', 'password');

    const pageTitleHeading = await page.getByText(
      'Full-Stack Survey Application',
    );
    const navigationBarUserAvatar = await page.getByRole('button', {
      name: 'Open settings',
    });

    await expect(pageTitleHeading).toBeVisible();
    await expect(navigationBarUserAvatar).toBeVisible();
  });

  test('User registration fails with duplicate username', async ({ page }) => {
    await userAuthHelper.registerUser(page, 'user', 'name', 'password');

    const errorNotification = await page.getByText('username already exists');

    await expect(errorNotification).toBeVisible();
  });

  test('User registration fails with duplicate name', async ({ page }) => {
    await userAuthHelper.registerUser(page, 'NewUser', 'user', 'password');

    const errorNotification = await page.getByText('name already exists');

    await expect(errorNotification).toBeVisible();
  });

  test('User can login with valid credentials', async ({ page }) => {
    await userAuthHelper.loginUser(page, 'user', 'password');

    const pageTitleHeading = await page.getByText(
      'Full-Stack Survey Application',
    );
    const snackBarNotification = await page.getByText('Successfully logged in');

    await expect(page).toHaveURL('/');
    await expect(pageTitleHeading).toBeVisible();
    await expect(snackBarNotification).toBeVisible();
  });

  test('User login fails with invalid credentials', async ({ page }) => {
    await userAuthHelper.loginUser(page, 'user', 'gibberish');

    const errorNotification = await page.getByText(
      'Invalid username or password',
    );

    await expect(errorNotification).toBeVisible();
  });
});
