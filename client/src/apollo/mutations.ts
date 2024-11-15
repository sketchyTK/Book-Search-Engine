import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email password: $password) {
      token
      User {
        _id
        username
        email
      }
    }
  }
`;

export const ADDUSER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
        user{
            _id
            username
            email
        }
    }
  }
`;

export const SAVEBOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks{
          bookId
          authors
          description
          title
          image
          link
      }
    }
  }
`;

export const REMOVEBOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
       _id
        username
        email
        savedBooks{
            bookId
            authors
            description
            title
            image
            link
        }
    }
  }
`;