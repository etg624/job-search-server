const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Comment = require('../models/comment');
const router = express.Router();
const Job = require('../models/job');

router.use(
  '/',
  passport.authenticate('jwt', { session: false, failWithError: true })
);

router.get('/', (req, res, next) => {
  Comment.find({ userId: req.user.id })

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

  Comment.findOne({ _id: id, userId })
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
  const { content } = req.body.comment;
  const { jobId } = req.body;
  const userId = req.user.id;
  const newComment = { content, userId };
  if (!content) {
    const err = new Error('missing content');
    err.status = 400;
    return next(err);
  }
  let job;
  let responseComment;
  Job.findOne({ _id: jobId, userId })
    .populate('comments')

    .then(result => {
      job = result;
    })
    .then(() => Comment.create(newComment))
    .then(Job.findOne({ _id: jobId, userId }).populate('comments'))
    .then(comment => {
      responseComment = comment;
      job.comments.push(comment._id);
      return job.save();
    })
    .then(() => res.json(responseComment))
    .catch(err => next(err));

  // Comment.create(newComment)
  //   // .populate('comments')
  //   .then(result => {
  //     res
  //       .location(`${req.originalUrl}/${result.id}`)
  //       .status(201)
  //       .json(result);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     return next(err);
  //   });
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  const updateComment = {};
  const updateJobFields = ['content'];
  updateJobFields.forEach(field => {
    if (field in req.body) {
      updateComment[field] = req.body[field];
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

  Comment.findOneAndUpdate({ _id: id, userId }, updateComment, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
  const userId = req.user.id;
  const { id } = req.params;

  Comment.findOneAndRemove({ _id: id, userId })
    .then(() => res.sendStatus(204))
    .catch(err => next(err));
});

module.exports = router;
