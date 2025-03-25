import { z } from 'zod';

export const newSurveyEntrySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  questions: z.array(
    z.object({
      question: z.string().min(1, 'Question text is required'), // Matches req.body's 'question'
      answers: z.array(
        z.object({
          answerText: z.string().min(1, 'Answer text is required'),
          timesAnswerd: z.number().default(0),
        }),
      ),
    }),
  ),
});
