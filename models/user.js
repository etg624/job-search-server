const mongoose = require('mongoose');

const user = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' }
});

user.set('timestamps', true);

// user.methods.serialize = function() {
//   return {
//     username: this.username,
//     firstName: this.firstName,
//     lastName: this.lastName
//   };
// };

user.set('toJSON', {
  virtuals: true,
  transform: (doc, result) => {
    delete result._id;
    delete result.__v;
  }
});

module.exports = mongoose.model('User', user);
