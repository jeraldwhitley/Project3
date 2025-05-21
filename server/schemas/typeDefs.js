const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    journalEntries: [JournalEntry]
    moods: [Mood]
  }

  type JournalEntry {
    _id: ID!
    text: String!
    createdAt: String
    mood: String
  }

  type Mood {
    _id: ID!
    value: String!
    createdAt: String
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    me: User
    journalEntries: [JournalEntry]
    moods: [Mood]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addMood(value: String!): Mood
    addJournalEntry(text: String!, mood: String): JournalEntry
  }
`;