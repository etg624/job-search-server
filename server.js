const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jobsRouter = require('./routes/jobs');
const commentsRouter = require('./routes/comments');
const eventsRouter = require('./routes/events');
const cors = require('cors');
require('dotenv').config();
const passport = require('passport');

const { router: usersRouter } = require('./users/router');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { PORT, DATABASE_URL } = require('./config');
const app = express();

mongoose.Promise = global.Promise;

app.use(morgan('common'));

// app.use(
//   cors({
//     origin: 'http://localhost:3000'
//   })
// );

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

app.use(express.json());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/api/jobs', jobsRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });
app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use((req, res, next) => {
  const err = new Error('404 Not Found');
  if (process.env.NODE_ENV === 'development') {
    console.log(err);
  }
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    if (process.env.NODE_ENV === 'production') {
      console.log(err);
    }

    res.status(500).json({ message: 'Internal Sever Error' });
  }
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(port, () => {
          console.log(`App listening on port ${port}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing Server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.log(err));
}
