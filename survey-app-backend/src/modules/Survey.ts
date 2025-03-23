import { Schema, model } from 'mongoose';
import { ISurvey } from '../types/survey.types';

const surveySchema = new Schema<ISurvey>({
  questions: [
    {
      title: { type: String, required: true },
      answers: [
        {
          answerText: { type: String, require: true },
          timesAnswerd: { type: Number, required: true, default: 0 },
        },
      ],
    },
  ],
});

const Survey = model<ISurvey>('Survey', surveySchema);

export default Survey;
