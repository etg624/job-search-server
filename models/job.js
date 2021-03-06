const mongoose = require('mongoose');

const job = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
  pay: { type: String },
  adLink: { type: String },
  companyLink: { type: String },
  dateApplied: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

job.set('timestamps', true);

job.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Job', job);
