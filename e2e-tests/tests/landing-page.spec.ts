import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test.describe('Landing page', () => {
  test('Front page can be found', async ({ page }) => {
    const pageTitleHeading = await page.getByText(
      'Full-Stack Survey Application',
    );
    const pageDescriptionParagraph = await page.getByText(
      'This project demonstrates a full-stack web application built using React',
    );

    await expect(pageTitleHeading).toBeVisible();
    await expect(pageDescriptionParagraph).toBeVisible();
  });

  test('Survey list is displayed with no surveys', async ({ page }) => {
    const surveyListTitle = await page.getByText('Available Surveys', {
      exact: true,
    });
    const surveyListFeedbackParagraph = await page.getByText(
      'No surveys available at the moment. Check back later or create one!',
    );

    await expect(surveyListTitle).toBeVisible();
    await expect(surveyListFeedbackParagraph).toBeVisible();
  });
});
