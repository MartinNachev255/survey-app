import { z } from 'zod';

export const newSurveyEntrySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  questions: z
    .array(
      z.object({
        question: z.string().min(1, 'Question text is required'), // Matches req.body's 'question'
        answers: z
          .array(
            z.object({
              answerText: z.string().min(1, 'Answer text is required'),
              timesAnswered: z.number().default(0),
            }),
          )
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
