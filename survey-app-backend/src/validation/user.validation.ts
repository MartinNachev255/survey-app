import { z } from 'zod';

export const newUserEntrySchema = z.object({
  username: z.string().min(3),
  name: z.string().min(3),
  password: z.string().min(3),
});
