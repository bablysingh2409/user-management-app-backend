const mongoose = require('mongoose');

const createdUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
});

const CreatedUser = mongoose.model('CreatedUser', createdUserSchema);

module.exports = CreatedUser;
