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

user.methods.serialize = function() {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName
  };
};

module.exports = mongoose.model('User', user);
