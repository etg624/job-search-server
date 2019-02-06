const express = require('express');
const mongoose = require('mongoose');

const Job = require('../models/job');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('FROM the backend');
  Job.find()

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
  // const userId = req.user.id;
  const newJob = { title, description, location, comments, pay };

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
    .catch(err => next(err));
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;

  Job.findOneAndRemove({ _id: id })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
