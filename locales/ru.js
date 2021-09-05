export default {
  translation: {
    appName: 'Simple Blog',
    layouts: {
      application: {
        title: 'Simple Blog',
        articles: 'Статьи',
      },
    },
    views: {
      index: {
        hello: 'Привет от Хекслета!',
        description: 'Практические курсы по программированию',
        more: 'Узнать Больше',
      },
      article: {
        id: {
          title: 'ID',
        },
        name: {
          title: 'Название',
          placeholder: 'Напишите название статьи',
        },
        content: {
          title: 'Содержание',
          placeholder: 'Напишите содержание здесь',
        },
        createdAt: {
          title: 'Дата создания',
        },
        create: {
          link: 'Создать статью',
          title: 'Создание статьи',
          submit: 'Создать',
          error: 'Не удалось создать статью',
          success: 'Статья успешно создана',
        },
        edit: {
          link: 'Изменить',
          title: 'Редактирование статьи',
          submit: 'Изменить',
          error: 'Не удалось изменить статью',
          success: 'Статья успешно изменена',
        },
        delete: {
          submit: 'Удалить',
          error: 'Не удалось удалить статью',
          success: 'Статья успешно удалена',
          confirmation: 'Вы действительно хотите удалить статью?',
        },
      },
    },
  },
};
