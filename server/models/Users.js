// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true // optional: adds createdAt and updatedAt fields
});

module.exports = mongoose.model('users', UserSchema);
