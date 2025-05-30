const { Schema, model } = require('mongoose');

const journalEntrySchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  mood: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

JournalEntry = model('JournalEntry', journalEntrySchema);
module.exports = JournalEntry;