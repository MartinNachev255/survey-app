export interface IUser {
  username: string;
  name: string;
  password: string;
}

export type LoginUser = Omit<IUser, 'name'>;
