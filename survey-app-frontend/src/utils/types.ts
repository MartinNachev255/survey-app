export interface IUser {
  token: string;
  username: string;
  name: string;
}

export interface ISurvey {
  title: string;
  questions: IQuestion[];
  user: object;
  id: string;
}

export interface IQuestion {
  question: string;
  answers: IAnswer[];
}

export interface IAnswer {
  answer: {
    answerText: string;
    timesAnswerd: number;
  };
}
