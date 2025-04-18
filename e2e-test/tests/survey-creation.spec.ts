import { test, expect } from '@playwright/test';
import userAuthHelper from './user-auth-helper';
import surveyHelper from './survey-creation-helper';

test.beforeEach(async ({ page, request }) => {
  await request.post('/api/testing/resetDB');
  const response = await request.post('/api/users', {
    data: {
      username: 'createSurvey',
      name: 'createSurvey',
      password: 'password',
    },
  });
  expect(response).toBeOK();
  await page.goto('');

  await userAuthHelper.loginUser(page, 'createSurvey', 'password');
  await expect(page.getByText('Successfully logged in')).toBeVisible();
});

test.describe('Survey creation', () => {
  test('Creating survey is successful', async ({ page }) => {
    await surveyHelper.createSurvey(page, 'Title', 'Description', 2, 3);

    const snackBarNotification = await page.getByText(
      'Survey successfully created',
    );

    await expect(snackBarNotification).toBeVisible();
    await expect(page).toHaveURL('');
  });

  test('Creating survey is not successful with duplicate Title', async ({
    page,
  }) => {
    await surveyHelper.createSurvey(page, 'Title', 'Description', 2, 3);
    await surveyHelper.createSurvey(page, 'Title', 'Description', 2, 3);

    await expect(
      page.getByText('Survey successfully created'),
    ).not.toBeVisible();

    await expect(page).not.toHaveURL('');
  });

  test('Creating survey is successful without Description', async ({
    page,
  }) => {
    await surveyHelper.createSurvey(
      page,
      'Survey without description',
      '',
      2,
      3,
    );

    const snackBarNotification = await page.getByText(
      'Survey successfully created',
    );

    await expect(snackBarNotification).toBeVisible();
    await expect(page).toHaveURL('');
  });

  test('Creating survey is not successful without Title', async ({ page }) => {
    await surveyHelper.createSurvey(page, '', 'Description', 2, 3);

    const snackBarNotification = await page.getByText(
      'Survey successfully created',
    );

    await expect(snackBarNotification).not.toBeVisible();
    await expect(page).toHaveURL('/survey/create');
  });

  test('Creating survey is not successful with less then 2 answers', async ({
    page,
  }) => {
    await surveyHelper.createSurvey(
      page,
      'Survey with one answer',
      'Description',
      1,
      0,
    );

    const snackBarNotification = await page.getByText(
      'Survey successfully created',
    );

    await expect(snackBarNotification).not.toBeVisible();
    await expect(page).toHaveURL('/survey/create');
  });

  test('Survey can be deleted by the author', async ({ page }) => {
    await surveyHelper.createSurvey(
      page,
      'Survey to delete',
      'Description',
      2,
      2,
    );

    await expect(page.getByText('Survey successfully created')).toBeVisible();

    const surveyToDelete = await page
      .locator('div')
      .filter({ hasText: 'Survey to delete' });

    page.on('dialog', (dialog) => dialog.accept());
    await surveyToDelete.getByRole('button', { name: 'Delete' }).last().click();

    await expect(page.getByText('Survey to delete')).not.toBeVisible();
    await expect(page.getByText('Survey deleted')).toBeVisible();
  });
});
