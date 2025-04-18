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

test.describe('Taking survey', () => {
  test.beforeEach(async ({ page }) => {
    await surveyHelper.createSurvey(
      page,
      'Survey to take',
      'Take this survey',
      2,
      3,
    );

    await expect(page.getByText('Survey successfully created')).toBeVisible();
    await expect(page).toHaveURL('/');
  });

  test('Taking a survey is successful', async ({ page }) => {
    await page.getByRole('link', { name: 'Take Survey' }).last().click();
    await expect(page).not.toHaveURL('/');

    await page
      .getByRole('radiogroup', { name: 'question-0' })
      .getByRole('radio')
      .first()
      .check();
    await page
      .getByRole('radiogroup', { name: 'question-1' })
      .getByRole('radio')
      .first()
      .check();
    await page
      .getByRole('radiogroup', { name: 'question-2' })
      .getByRole('radio')
      .first()
      .check();

    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByText('Has been answered 1 times')).toHaveCount(3);
  });

  test('Cannot submit survey if all questions are not answered', async ({
    page,
  }) => {
    await page.getByRole('link', { name: 'Take Survey' }).last().click();
    await expect(page).not.toHaveURL('/');

    await page
      .getByRole('radiogroup', { name: 'question-0' })
      .getByRole('radio')
      .first()
      .check();
    await page
      .getByRole('radiogroup', { name: 'question-1' })
      .getByRole('radio')
      .first()
      .check();

    await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
