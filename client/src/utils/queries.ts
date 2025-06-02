import {gql} from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      journalEntries {
        _id
        text
        content
        createdAt
      }
      moods {
        _id
        type
        description
        createdAt
      }
    }
  }
`;

export const GET_JOURNAL_ENTRIES = gql`
  query GetJournalEntries {
    journalEntries {
      _id
      text
      mood
      createdAt
    }
  }
`;
