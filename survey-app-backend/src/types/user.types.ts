export interface IUser {
  username: string;
  name: string;
  password: string;
  surveys: object[];
  id: string;
}

export type NewUserEntry = Omit<IUser, 'id' | 'surveys'>;

export type NewUserEntryNoPass = Omit<NewUserEntry, 'password'>;

export type LoginUser = Omit<IUser, 'name' | 'id'>;
