import { describe, test, afterAll, beforeEach, expect } from '@jest/globals';
import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../src/app';
import User from '../src/modules/User';
import Survey from '../src/modules/Survey';
import initialSurveys from './initialSurveys.json';

const api = supertest(app);

const initialUser = {
  username: 'testUser',
  name: 'Test User',
  password: 'password123',
};

let authToken: string;

const getAuthToken = async () => {
  const response = await api.post('/api/login').send({
    username: initialUser.username,
    password: initialUser.password,
  });

  return response.body.token;
};

beforeEach(async () => {
  await User.deleteMany({});
  await Survey.deleteMany({});

  await Promise.all(
    initialSurveys.map(async (survey) => {
      const surveyObject = new Survey(survey);
      return surveyObject.save();
    }),
  );

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(initialUser.password, saltRound);
  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    password: passwordHash,
  });

  await user.save();
  authToken = await getAuthToken();
});

describe('Get surveys from database', () => {
  test('Get surveys successfully', async () => {
    const response = await api
      .get('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toBeDefined();

    expect(response.body.length).toBe(initialSurveys.length);
    expect(response.body[0].title).toBe(initialSurveys[0].title);
  });
});

describe('Add survey to database', () => {
  test('Adding survey is successful', async () => {
    const newSurvey = {
      title: 'Title',
      description: 'Description',
      questions: [
        {
          question: 'q1',
          answers: [
            {
              answerText: 'a1',
            },
            {
              answerText: 'a2',
            },
          ],
        },
      ],
    };

    const response = await api
      .post('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSurvey)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.title).toBe(newSurvey.title);
    expect(response.body.author).toBe(initialUser.name);
  });

  test('Adding survey without description is successful', async () => {
    const newSurvey = {
      title: 'Title',
      questions: [
        {
          question: 'q1',
          answers: [
            {
              answerText: 'a1',
            },
            {
              answerText: 'a2',
            },
          ],
        },
      ],
    };

    const response = await api
      .post('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSurvey)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.title).toBe(newSurvey.title);
    expect(response.body.author).toBe(initialUser.name);
    expect(response.body.description).not.toBeDefined();
  });

  test('Adding survey fails with duplicate title', async () => {
    const newSurvey = {
      title: initialSurveys[0].title,
      description: 'Description',
      questions: [
        {
          question: 'q1',
          answers: [
            {
              answerText: 'a1',
            },
            {
              answerText: 'a2',
            },
          ],
        },
      ],
    };

    const response = await api
      .post('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSurvey)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Duplicate key');
    expect(response.body.keyValue.title).toBe(initialSurveys[0].title);
  });

  test('Adding survey fails without title', async () => {
    const newSurvey = {
      description: 'Description',
      questions: [
        {
          question: 'q1',
          answers: [
            {
              answerText: 'a1',
            },
            {
              answerText: 'a2',
            },
          ],
        },
      ],
    };

    const response = await api
      .post('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSurvey)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Validation error');
    expect(response.body.details.fieldErrors.title).toBeDefined();
  });

  test('Adding survey fails without questions', async () => {
    const newSurvey = {
      title: 'Title',
      description: 'Description',
    };

    const response = await api
      .post('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSurvey)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Validation error');
    expect(response.body.details.fieldErrors.questions).toBeDefined();
  });

  test('Adding survey fails without at least 2 answers', async () => {
    const newSurvey = {
      title: 'Title',
      description: 'Description',
      questions: [
        {
          question: 'q1',
          answers: [
            {
              answerText: 'a1',
            },
          ],
        },
      ],
    };

    const response = await api
      .post('/api/survey')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newSurvey)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Validation error');
    expect(response.body.details.fieldErrors.questions).toStrictEqual([
      'Need to have at least 2 answers',
    ]);
  });

  test('Adding survey fails without token', async () => {
    const newSurvey = {
      title: 'Title',
      description: 'Description',
      questions: [
        {
          question: 'q1',
          answers: [
            {
              answerText: 'a1',
            },
            {
              answerText: 'a2',
            },
          ],
        },
      ],
    };

    const response = await api
      .post('/api/survey')
      .send(newSurvey)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('unauthorized');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
