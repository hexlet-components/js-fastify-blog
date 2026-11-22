// @ts-check

export default {
  translation: {
    appName: "Simple blog",
    flash: {
      articles: {
        create: {
          error: "Failed to create article",
          success: "Article was created",
        },
      },
    },
    layouts: {
      application: {
        articles: "Articles",
      },
      actions: {
        view: "View",
        edit: "Edit",
        delete: "Delete",
      },
    },
    views: {
      article: {
        create: {
          success: "Success",
          error: "Error",
        },
        edit: {
          success: "Success",
          error: "Error",
        },
        delete: {
          success: "Success",
          error: "Error",
        },
        title: {
          label: "Title",
        },
        content: {
          label: "Content",
          placeholder: "Enter article content",
        },
      },
      articles: {
        index: {
          header: "Articles",
          id: "ID",
          title: "Title",
          createdAt: "Created at",
          actions: "Actions",
          new: "New article",
          delete_confirmation: "Delete confirmation",
        },
        edit: {
          header: "Edit article",
          submit: "Update",
        },
        new: {
          header: "New article",
          submit: "Create",
        },
      },

      comments: {
        header: "Comments",
        empty: "No comments yet. Be the first to write one.",
        anonymous: "Anonymous",
        form: {
          header: "Add a comment",
        },
        author: {
          label: "Name (optional)",
        },
        content: {
          label: "Comment",
          placeholder: "Write a comment",
        },
        submit: "Add comment",
        create: {
          success: "Comment was added",
          error: "Failed to add comment",
        },
      },

      welcome: {
        index: {
          hello: "Hello from Hexlet!",
          description: "Online programming school",
          more: "Learn more",
        },
      },
    },
  },
};
