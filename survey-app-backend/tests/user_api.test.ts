import { describe, test, afterAll, beforeEach, expect } from '@jest/globals';
import supertest from 'supertest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import app from '../src/app';
import User from '../src/modules/User';

const api = supertest(app);

const initialUser = {
  username: 'testUser',
  name: 'Test User',
  password: 'password123',
};

beforeEach(async () => {
  await User.deleteMany({});

  const saltRound = 10;
  const passwordHash = await bcrypt.hash(initialUser.password, saltRound);
  const user = new User({
    username: initialUser.username,
    name: initialUser.name,
    password: passwordHash,
  });
  await user.save();
});

describe('Add user to database', () => {
  test('Add a user is successful', async () => {
    const newUser = {
      username: 'newUser',
      name: 'newUser',
      password: 'pass',
    };
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe(newUser.username);
    expect(response.body.name).toBe(newUser.name);
  });

  test('Adding user is successful with exact minimum length for credentials', async () => {
    const newUser = {
      username: 'usr',
      name: 'usr',
      password: 'pws',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe(newUser.username);
  });

  test('Adding user fails with duplicate username', async () => {
    const newUser = {
      username: initialUser.username,
      name: 'newUser',
      password: 'pass',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('Duplicate key');
    expect(response.body.keyValue.username).toBe(initialUser.username);
  });

  test('Adding user with short username fails', async () => {
    const newUser = {
      username: 'us',
      name: 'newUser',
      password: 'pass',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('Validation error');
    expect(response.body.details.fieldErrors.username).toBeDefined();
  });

  test('Adding user with short name fails', async () => {
    const newUser = {
      username: 'newUser',
      name: 'nm',
      password: 'pass',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('Validation error');
    expect(response.body.details.fieldErrors.name).toBeDefined();
  });

  test('Adding user with short password fails', async () => {
    const newUser = {
      username: 'newUser',
      name: 'newUser',
      password: 'pw',
    };

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('Validation error');
    expect(response.body.details.fieldErrors.password).toBeDefined();
  });

  test('User passwords gets hashed successfully', async () => {
    const newUser = {
      username: 'newUser',
      name: 'newUser',
      password: 'pass',
    };
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const savedNewUser = await User.findOne({ username: 'newUser' });

    let newUserHashedPassword: boolean;

    expect(savedNewUser?.password).not.toBe(newUser.password);

    if (savedNewUser) {
      newUserHashedPassword = await bcrypt.compare(
        newUser.password,
        savedNewUser.password,
      );
    } else {
      newUserHashedPassword = false;
    }

    expect(newUserHashedPassword).toBe(true);
  });
});

describe('User Login API', () => {
  test('Login succeeds with correct credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: initialUser.username,
        password: initialUser.password,
      })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe(initialUser.username);
    expect(response.body.name).toBe(initialUser.name);
  });

  test('Login fails with incorrect password', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: initialUser.username,
        password: 'wrongpassword',
      })
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('Invalid username or password');
  });

  test('Login fails with non-existent username', async () => {
    const response = await api
      .post('/api/login')
      .send({
        username: 'nonexistentuser',
        password: 'password123',
      })
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(response.body.message).toBe('Invalid username or password');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
