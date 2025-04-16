import { Page, test, expect } from '@playwright/test';

type answerLimit = 0 | 1 | 2 | 3;

export const createSurvey = async (
  page: Page,
  title: string,
  description: string,
  addQuestions: number,
  addAnswersPerQuestion: answerLimit,
): Promise<void> => {
  const createSurveyButton = await page
    .getByRole('button', { name: 'Create survey' })
    .last();
  await createSurveyButton.click();

  await page.getByRole('textbox', { name: 'Title' }).fill(title);

  if (description) {
    await page.getByRole('textbox', { name: 'Description' }).fill(description);
  }

  for (let i = 0; i < addQuestions; i++) {
    await page.getByRole('button', { name: 'Add Question' }).click();
  }

  const questionsInputs = await page.getByRole('textbox', {
    name: 'Question',
  });
  for (let i = 0; i < addQuestions + 1; i++) {
    await questionsInputs.nth(i).fill(`Question ${i + 1}`);
  }

  const answersButtons = await page.getByRole('button', {
    name: 'Add Answer',
  });
  for (let i = 0; i < addQuestions + 1; i++) {
    for (let j = 0; j < addAnswersPerQuestion; j++) {
      await answersButtons.nth(i).click();
    }
  }

  const answersInputs = await page.getByRole('textbox', {
    name: 'answer',
  });
  for (let i = 0; i < (addQuestions + 1) * (addAnswersPerQuestion + 1); i++) {
    await answersInputs.nth(i).fill(`Answer ${i}`);
  }

  await page.getByRole('button', { name: 'Submit Survey' }).click();
};

export default { createSurvey };
