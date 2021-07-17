// @ts-check

export default async (fastify, opts) => {
  fastify.get('/', async (_request) => {
    return 'Hello, World!';
  });
}
