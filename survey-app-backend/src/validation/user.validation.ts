import { z } from 'zod';

export const newUserEnrtySchema = z.object({
  username: z.string().min(3),
  name: z.string(),
  password: z.string().min(3),
});
