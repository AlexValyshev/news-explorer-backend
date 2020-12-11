const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getArticles, postArticles, deleteArticles } = require('../controllers/articles.js');
const { articlePost, article } = require('../middlewares/celebrate');

router.get('/articles', getArticles);
router.post('/articles', celebrate(articlePost), postArticles);
router.delete('/articles/:articleId', celebrate(article), deleteArticles);

module.exports = router;
