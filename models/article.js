const mongoose = require('mongoose');

const regex = /https?:\/\/[www.]?[a-z0-9.\-_]{1,}\.[a-z]{2,4}[a-z0-9/.\-=#_]{1,}/;
const articleSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введена неправильная ссылка',
    },
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Введена неправильная ссылка на image',
    },
    required: true,
  },
  owner: {
    default: {},
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
