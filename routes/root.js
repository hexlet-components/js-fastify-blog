// @ts-check

export default async (fastify) => {
  fastify.get('/', async () => {
    return 'Hello, World!';
  });
}
