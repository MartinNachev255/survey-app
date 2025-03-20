import { z } from 'zod';
import { IUser } from '../types/user.types.ts';


export const newUserEnrtySchema = z.object({
  username: z.string().min(3),
  name: z.string(),
  password: z.string().min(3)
});

export const newUserEnrty = (object: unknown) : IUser => {
  return newUserEnrtySchema.parse(object);
};
