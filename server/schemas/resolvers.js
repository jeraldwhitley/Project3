const db = require("../config/connection.js");

const resolvers = {
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Query: {
    async me(_, { id }) {
      let collection = await db.collection("User");
      let query = { _id: new ObjectId(id) };

      return await collection.findOne(query).populate('JournalEntries').populate('Moods');
    },
    async journalEntries(_, { id }) {
      let collection = await db.collection("JournalEntries");
      let query = { user: new ObjectId(id) };

      return await collection.find(query).toArray();
    },
    async moods(_, { id }) {
      let collection = await db.collection("Mood");
      let query = { user: new ObjectId(id) };

      return await collection.find(query).toArray();
    },
  },
  Mutation: {
    async addUser(_, args, context) {
      let collection = await db.collection("User");
      const user = await collection.insertOne(args);
      if (user.acknowledged){
          console.log('Created New User: ',{ ...args, id: user.insertedId })
          return { ...args, id: user.insertedId };
      }
      return null;
    },
    async addMood(_, { value }, { id }) {
      let collection = await db.collection("Mood");
      const mood = await collection.insertOne({ value, user: id });
      if (mood.acknowledged){
          console.log('Created New Mood: ',mood)
          return mood;
      }
      return null;
    },
  },
};

module.exports = resolvers;