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
  Job.find({ userId: req.user.id })
    .populate('comments')
    .populate('events')
    .then(results => res.json(results))
    .catch(err => {
      next(err);
    });
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The id is not valid');
    err.status = 400;
    return next(err);
  }

  Job.findOne({ _id: id, userId })
    .populate('comments')
    .populate('events')
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
  const { title, description, location, comments, pay, events } = req.body;
  const userId = req.user.id;
  const newJob = {
    title,
    description,
    location,
    comments,
    pay,
    userId,
    events
  };

  if (!title) {
    const err = new Error('missing title');
    err.status = 400;
    return next(err);
  }

  Job.create(newJob)
    .then(result => {
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

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const updateJob = {};
  const updateJobFields = [
    'title',
    'description',
    'location',
    'comments',
    'pay',
    'events'
  ];
  updateJobFields.forEach(field => {
    if (field in req.body) {
      updateJob[field] = req.body[field];
    }
  });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The id is not valid');
    err.status = 400;
    return next(err);
  }

  // if (!title) {
  //   const err = new Error('Missing title');
  //   err.status = 400;
  //   return next(err);
  // }
  Job.findOneAndUpdate({ _id: id, userId }, updateJob, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  Job.findOneAndRemove({ _id: id, userId })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
