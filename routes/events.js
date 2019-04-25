const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Event = require('../models/event');
const router = express.Router();
const Job = require('../models/job');

router.use(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true })
);

module.exports = router;

router.get('/', (req, res, next) => {
  Event.find({ userId: req.user.id })

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

  Event.findOne({ _id: id, userId })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
});

router.post('/', (req, res, next) => {
  const { title, start, end, color } = req.body.event;
  const { jobId } = req.body;
  const userId = req.user.id;
  const newEvent = { start, title, userId, end, color };
  if (!title) {
    const err = new Error('missing title');
    err.status = 400;
    return next(err);
  }
  let job;
  let responseEvent;

  Job.findOne({ _id: jobId, userId })
    .populate('events')
    .then(result => {
      job = result;
    })
    .then(() => Event.create(newEvent))
    .then(Job.findOne({ _id: jobId, userId }).populate('events'))
    .then(event => {
      responseEvent = event;
      job.events.push(event._id);
      return job.save();
    })
    .then(() => res.json(responseEvent))
    .catch(err => {
      console.log(err);
      return next(err);
    });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const updateEvent = {};

  const updateableFields = ['title', 'start', 'end'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateEvent[field] = req.body[field];
    }
  });
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The id is not valid');
    err.status = 400;
    return next(err);
  }

  Event.findOneAndUpdate({ _id: id, userId }, updateEvent, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  const userId = req.user.id;

  Event.findOneAndRemove({ _id: id, userId })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});
