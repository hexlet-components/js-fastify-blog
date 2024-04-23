// @ts-check

export default (app) => {
  app
    .get('/', { name: 'root' }, (req, reply) => {
      reply.render('root/index');
    });
};
