const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  passwordHash: { type: String },
  skills: [{ type: String }],
  wants: [{ type: String }],
  credits: { type: Number, default: 10 },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
