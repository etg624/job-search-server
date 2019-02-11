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
router.post('/', (req, res, next) => {
  console.log('BODY', req.body.events);
  const { title } = req.body;
  const { jobId } = req.body;
  const userId = req.user.id;
  const newEvent = { title, userId };
  // if (!title) {
  //   const err = new Error('missing title');
  //   err.status = 400;
  //   return next(err);
  // }
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
      job.event.push(event.id);
      return job.save();
    })
    .then(() => res.json(responseEvent))
    .catch(err => next(err));
});
