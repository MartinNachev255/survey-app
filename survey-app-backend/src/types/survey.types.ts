export interface ISurvey {
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  title: string;
  answers: IAnswer[];
}

export interface IAnswer {
  answer: {
    answerText: string;
    timesAnswerd: number;
  };
}
