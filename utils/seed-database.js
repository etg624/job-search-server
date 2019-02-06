const mongoose = require('mongoose');

const { DATABASE_URL } = require('../config');
const Job = require('../models/job');
const Comment = require('../models/comment');
const { User } = require('../models/user');

const { jobs, comments, users } = require('../fake-data/fakeData');

console.log(`Connecting to mongodb ad ${DATABASE_URL}`);
mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => {
    console.info('Deleting Data...');
    return Promise.all([
      Job.deleteMany(),
      Comment.deleteMany(),
      User.deleteMany()
    ]);
  })
  .then(() => {
    console.info('Seeding Database...');
    return Promise.all([
      Job.insertMany(jobs),
      Comment.insertMany(comments),
      User.insertMany(users)
    ]);
  })
  .then(results => {
    console.log('Inserted', results);
    console.info('Disconnecting.....');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.log(err);
    return mongoose.disconnect();
  });
