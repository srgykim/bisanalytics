const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  firstName: {
    type: String,
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  about: {
    type: String,
    required: false
  },
  subscribedToNewsletter: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);
