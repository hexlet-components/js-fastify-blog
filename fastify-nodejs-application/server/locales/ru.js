// @ts-check

export default {
  translation: {
    appName: 'Простой блог',
    flash: {
      session: {
        create: {
          success: 'Вы вошли в систему',
          error: 'Неправильный email или пароль',
        },
        delete: {
          success: 'Вы вышли из системы',
        },
      },
    },
    layouts: {
      application: {
        articles: 'Статьи',
      },
      actions: {
        view: 'Просмотр',
        edit: 'Редактировать',
        delete: 'Удалить',
      },
    },
    views: {
      article: {
        content: {
          placeholder: 'Введите содержимое статьи',
        },
      },
      articles: {
        index: {
          header: 'Статьи',
          id: 'ID',
          title: 'Заголовок',
          createdAt: 'Создано',
          actions: 'Действия',
          new: 'Новая статья',
          delete_confirmation: 'Подтверждение удаления',
        },
        edit: {
          header: 'Редактировать статью',
          submit: 'Обновить',
        },
        new: {
          header: 'New Article',
          submit: 'Create'
        }
      },
      welcome: {
        index: {
          hello: 'Привет от Хекслета!',
          description: 'Школа онлайн программирования',
          more: 'Узнать больше',
        },
      },
    },
  },
};
