import {gql} from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      journalEntries {
        _id
        title
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