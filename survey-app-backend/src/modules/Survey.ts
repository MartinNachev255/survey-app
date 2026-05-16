import mongoose, { Schema, model } from 'mongoose';
import { ISurvey } from '../types/survey.types';

const surveySchema = new Schema<ISurvey>({
  title: { type: String, required: true, unique: true, minlength: 5 },
  description: { type: String },
  questions: [
    {
      question: { type: String, required: true },
      answers: [
        {
          answerText: { type: String, require: true },
          timesAnswered: { type: Number, required: true, default: 0 },
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  author: {
    type: String,
    ref: 'User.name',
  },
});

surveySchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    const { _id, __v, ...rest } = returnedObject;
    return {
      ...rest,
      id: _id.toString(),
    };
  },
});

const Survey = model<ISurvey>('Survey', surveySchema);

export default Survey;
