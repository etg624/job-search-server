const mongoose = require('mongoose');

const comment = new mongoose.Schema({
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

comment.index({ userId: 1, content: 1 }, { unique: true });
comment.set('timestamps', true);

comment.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Comment', comment);
