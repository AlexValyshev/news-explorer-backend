const Article = require('../models/article.js');
const { ArticleNotFound, ArticlesNotFound, ForbiddenDelArticle } = require('../configs/constants');
const ErrorNotFound = require('../errors/error-not-found');
const ErrorForbidden = require('../errors/error-forbidden');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(() => {
      throw new ErrorNotFound(ArticlesNotFound);
    })
    .then((articles) => {
      res.send(articles);
    })
    .catch((err) => {
      next(err);
    });
};

const postArticles = (req, res, next) => {
  const {
    number, keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = {
    _id: req.user._id,
  };
  Article.create({
    number, keyword, title, text, date, source, link, image, owner,
  })
    .then((article) => res.send(article))
    .catch((err) => {
      next(err);
    });
};

const deleteArticles = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;
  Article.findById(articleId).select('+owner')
    .orFail(() => {
      throw new ErrorNotFound(ArticleNotFound);
    })
    .then((article) => {
      if (article.owner.toString() === userId) {
        Article.findByIdAndRemove(articleId)
          .then((delArticle) => res.send(delArticle));
      } else {
        throw new ErrorForbidden(ForbiddenDelArticle);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  getArticles,
  postArticles,
  deleteArticles,
};
