const express = require('express');
const mongoose = require('mongoose');

const Job = require('../models/job');
const router = express.Router();

router.get('/', (req, res, next) => {
  Job.find()
    .then(results => res.json(results))
    .catch(err => {
      next(err);
    });
});

module.exports = router;
