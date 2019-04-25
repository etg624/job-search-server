const mongoose = require('mongoose');
const event = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// event.index({ userId: 1 }, { unique: true });
event.set('timestamps', true);

event.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('Event', event);
