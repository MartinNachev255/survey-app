import { z } from 'zod';

export const newSurveyEntrySchema = z.object({
  title: z.string().min(5, 'Title need to be at least 5 characters long'),
  description: z.string().optional(),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, 'Question text is required'),
        answers: z
          .array(
            z.object({
              answerText: z.string().min(1, 'Answer text is required'),
              timesAnswered: z.number().default(0),
            }),
          )
          .min(2, 'Need to have at least 2 answers')
          .max(5, 'A question can have 4 answers at most'),
      }),
    )
    .max(20, "Can't have more then 20 questions"),
});

export const newAnswersEntrySchema = z.array(
  z.object({
    questionsIndex: z.number(),
    answersIndex: z.number(),
  }),
);
