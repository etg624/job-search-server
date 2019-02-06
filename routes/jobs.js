const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Job = require('../models/job');
const router = express.Router();

router.use(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true })
);

router.get('/', (req, res, next) => {
  console.log(req.user);
  Job.find({ userId: req.user.id })

    .then(results => res.json(results))
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The id is not valid');
    err.status = 400;
    return next(err);
  }

  Job.findOne({ _id: id })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

router.post('/', (req, res, next) => {
  const { title, description, location, comments, pay } = req.body;
  const userId = req.user.id;
  const newJob = { title, description, location, comments, pay, userId };

  if (!title) {
    const err = new Error('missing title');
    err.status = 400;
    return next(err);
  }

  Job.create(newJob)
    // .populate('comments')
    .then(result => {
      console.log('hello from the backend');
      res
        .location(`${req.originalUrl}/${result.id}`)
        .status(201)
        .json(result);
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Job.findOneAndRemove({ _id: id })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
