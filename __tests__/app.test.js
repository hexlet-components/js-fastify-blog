import fastify from 'fastify';
import configure from '../app.js'

let app;

describe('server test', () => {
  beforeAll(() => {
    app = fastify();
    configure(app);
  });

  afterAll(() => {
    app.close();
  });

  test('responds with success on request /', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    });

    expect(response.statusCode).toBe(200);
  });
});
