export interface IUser {
  token: string;
  username: string;
  name: string;
}

export interface ISurvey {
  title: string;
  description: string;
  questions: IQuestion[];
  user: object;
  author: string;
  id: string;
}

export interface IQuestion {
  question: string;
  answers: IAnswer[];
}

export interface IAnswer {
  answerText: string;
  timesAnswered?: number;
}
export interface AnswerSelection {
  questionsIndex: number;
  answersIndex: number;
}

export interface NewSurveyEntry {
  title: string;
  description: string;
  questions: IQuestion[];
}
