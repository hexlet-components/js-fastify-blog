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
        create: {
          success: 'Статья создана',
          error: 'Не удалось создать статью',
        },
        edit: {
          success: 'Статья обновлена',
          error: 'Не удалось обновить статью',
        },
        delete: {
          success: 'Статья удалена',
          error: 'Не удалось удалить статью',
        },
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
          header: 'Новая статья',
          submit: 'Создать',
        },
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
