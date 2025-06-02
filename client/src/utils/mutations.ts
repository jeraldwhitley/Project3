import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_MOOD = gql`
  mutation AddMood($value: String!) {
    addMood(value: $value) {
      _id
      value
      date
    }
  }
`;

export const ADD_JOURNAL_ENTRY = gql`
  mutation AddJournalEntry($text: String!, $mood: String!) {
    addJournalEntry(text: $text, mood: $mood) {
      _id
      text
      mood
      date
    }
  }
`;
