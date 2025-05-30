const { Schema, model } = require('mongoose');

const moodSchema = new Schema({
  value: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

Mood = model('Mood', moodSchema);
module.exports = Mood;