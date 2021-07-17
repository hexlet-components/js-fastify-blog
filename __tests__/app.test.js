import fastify from 'fastify';
import fp from 'fastify-plugin';
import App from '../app.js';

let app;

describe('server test', () => {
  beforeAll(async () => {
    app = fastify();
    await app.register(fp(App), {});
  });

  afterAll(async () => {
    await app.close();
  });

  test('responds with success on request /', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
  });
});
