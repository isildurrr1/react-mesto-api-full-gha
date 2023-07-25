require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const cors = require('cors');
const { PORT = 3000 } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const handleErrors = require('./middlewares/handleErrors');
const NotFoundError = require('./errors/NotFoundError');

const {
  loginValid,
  createUserValid,
} = require('./middlewares/validation');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', loginValid, login);
app.post('/signup', createUserValid, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Некорректно указан путь'));
});

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
