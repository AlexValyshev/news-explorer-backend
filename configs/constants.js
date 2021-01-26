module.exports = {
  ResourceNotFound: 'Запрашиваемый ресурс не найден', // 404
  ErrorServer: 'Ошибка на стороне сервера', // 500
  InvalidData: 'Переданы некорректные данные:', // 400
  ArticleNotFound: 'Статья не найдена', // 404
  ArticlesNotFound: 'Статьи не найдены', // 404
  InvalidIdArticle: 'Не корректный _id статьи', // 400
  UserNotFound: 'Пользователь не найден', // 404
  InvalidDataAuth: 'Почта или пароль введены некорректно', // 400
  ConflictEmail: 'Пользователь с такой почтой уже создан', // 409
  RequiredAuthorization: 'Необходима авторизация', // 401
  InvalidIdUser: 'Не корректный _id пользователя', // 400
  ForbiddenDelArticle: 'Нельзя удалять чужие статьи', // 403
};
