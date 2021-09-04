module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    'Article',
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      content: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
      },
    },
  );

  return Article;
};
