import mongoose, { Schema, model } from 'mongoose';
import { ISurvey } from '../types/survey.types';

const surveySchema = new Schema<ISurvey>({
  title: { type: String, required: true, unique: true },
  questions: [
    {
      question: { type: String, required: true },
      answers: [
        {
          answerText: { type: String, require: true },
          timesAnswerd: { type: Number, required: true, default: 0 },
        },
      ],
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

surveySchema.set('toJSON', {
  transform: (_document, retrurnedObject) => {
    retrurnedObject.id = retrurnedObject._id.toString();
    delete retrurnedObject._id;
    delete retrurnedObject.__v;
  },
});

const Survey = model<ISurvey>('Survey', surveySchema);

export default Survey;
