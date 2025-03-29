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

export type NewSurveyEntry = Omit<ISurvey, 'id'>;

export interface AnswersEntry {
  questionsIndex: number;
  answersIndex: number;
}
