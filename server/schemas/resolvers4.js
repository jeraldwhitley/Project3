const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { User, JournalEntry, Mood } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


module.exports = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return User.findById(context.user._id).populate('journalEntries').populate('moods');
    },
    journalEntries: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return JournalEntry.find({ user: context.user._id });
    },
    moods: async (parent, args, context) => {
      if (!context.user) throw new AuthenticationError('Not logged in');
      return Mood.find({ user: context.user._id });
    },
  },
  Mutation: {
    login: async (_, { email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.isCorrectPassword(password))) {
    throw new AuthenticationError('Incorrect credentials');
  }

  const token = signToken(user); // <-- Now token is created

  console.log("=== DEBUG ===");
  console.log("User:", user);
  console.log("Token:", token); // <-- Safe to log here
  console.log("==============");

  return { token, user };
},
    addUser: async (_, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    addMood: async (_, { value }, context) => {
      if (!context.user) throw new AuthenticationError('Login required');
      const mood = await Mood.create({ value, user: context.user._id });
      await User.findByIdAndUpdate(context.user._id, { $push: { moods: mood._id } });
      return mood;
    },
    addJournalEntry: async (_, { text, mood }, context) => {
      if (!context.user) throw new AuthenticationError('Login required');
      const entry = await JournalEntry.create({ text, mood, user: context.user._id });
      await User.findByIdAndUpdate(context.user._id, { $push: { journalEntries: entry._id } });
      return entry;
    },
  },
};