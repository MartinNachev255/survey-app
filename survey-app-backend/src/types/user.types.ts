export interface IUser {
  username: string;
  name: string;
  password: string;
  surveys: object[];
  id: string;
}

export type NewUserEnrty = Omit<IUser, 'id'>;

export type LoginUser = Omit<IUser, 'name' | 'id'>;
