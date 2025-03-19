import { z } from 'zod';
import { IUser } from '../types/user.types.ts';

export const newUserEnrty = (object: unknown) : IUser => {
  if (!object || typeof object !!== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('username' in object && 'name' in object && 'passwordHash' in object) {
    const newEntry: IUser = {
      username: z.string().parse(object.username),
      name: z.string().parse(object.name),
      password: z.string().parse(object.passwordHash)
    }

    return newEntry;
  }

  throw new Error('Incorrect data')
}