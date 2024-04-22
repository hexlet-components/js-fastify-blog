// @ts-check

export default {
  translation: {
    appName: 'Fastify Boilerplate',
    flash: {
      session: {
        create: {
          success: 'You are logged in',
          error: 'Wrong email or password',
        },
        delete: {
          success: 'You are logged out',
        },
      },
      users: {
        create: {
          error: 'Failed to register',
          success: 'User registered successfully',
        },
      },
      authError: 'Access denied! Please login',
    },
    layouts: {
      application: {
        articles: 'Articles',
      },
    },
    views: {
      article: {
        content: {
          placeholder: 'Enter article content',
        },
      },
      articles: {
        index: {
          header: 'Articles',
          id: 'ID',
          title: 'Title',
          createdAt: 'Created at',
          actions: 'Actions',
          new: 'New article',
          view: 'View',
          edit: 'Edit',
          delete_confirmation: 'Delete confirmation',
          delete: 'Delete',
        },
        edit: {
          header: 'Edit article',
          submit: 'Update'
        }
      },

      welcome: {
        index: {
          hello: 'Hello from Hexlet!',
          description: 'Online programming school',
          more: 'Learn more',
        },
      },
    },
  },
};
