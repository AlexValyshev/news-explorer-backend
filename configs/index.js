const SALT_ROUND = 10;
const { NODE_ENV, MOMGO_DB_URL } = process.env;
const DB_URL = NODE_ENV === 'production' ? MOMGO_DB_URL : 'mongodb://localhost:27017/newsdb';
const { PORT = 3001 } = process.env;
const DB_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  SALT_ROUND,
  DB_URL,
  DB_OPTIONS,
  PORT,
};
