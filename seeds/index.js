const db = require('../server/config/connection');
const { User, Mood, JournalEntry } = require('../server/models');
const mongoose = require('mongoose');

const userData = [
  {
    username: 'mindful_user',
    email: 'mindful@example.com',
    password: 'password123',
  },
];

const seedDatabase = async () => {
  try {
    await db.once('open', async () => {
      console.log('Database connected');

      await User.deleteMany();
      await Mood.deleteMany();
      await JournalEntry.deleteMany();

      const users = await User.insertMany(userData);
      console.log('Users seeded:', users);

      const moods = await Mood.insertMany([
        { value: 'Happy', user: users[0]._id },
        { value: 'Anxious', user: users[0]._id },
      ]);

      const entries = await JournalEntry.insertMany([
        {
          text: 'Had a productive and relaxing day.',
          mood: 'Happy',
          user: users[0]._id,
        },
        {
          text: 'Feeling overwhelmed with work.',
          mood: 'Anxious',
          user: users[0]._id,
        },
      ]);

      // Link data to user
      await User.findByIdAndUpdate(users[0]._id, {
        $push: {
          moods: { $each: moods.map((m) => m._id) },
          journalEntries: { $each: entries.map((e) => e._id) },
        },
      });

      console.log('Seeding complete ✅');
      process.exit(0);
    });
  } catch (err) {
    console.error('Seeding error ❌', err);
    process.exit(1);
  }
};

seedDatabase();