const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

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

user.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

user.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', user);

module.exports = { User };
