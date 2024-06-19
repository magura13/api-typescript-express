
import request from 'supertest';
import { expect, jest, test, describe, beforeAll, afterAll } from '@jest/globals';
import { DbConnection } from '../database/dbConnect';

const app = require('../../dist/app.js')

describe('User Controller', () => {

  beforeAll(async () => {
    await DbConnection.getInstance().connect()
  })

  afterAll(async () => {
    await DbConnection.getInstance().disconnect()
  })

  it('Should create a user ', async () => {

    const newUser = {
      password: "V@ticano290335",
      email: "berasddaasdadaa@gmail.com",
      userName: "samucsadsaa123asdas"
    };

    const response = await request(app)
                          .post('/user')
                          .send(newUser);

    expect(response.status).toBe(200);

  })
});