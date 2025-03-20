import { z } from 'zod';

export const LoginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
