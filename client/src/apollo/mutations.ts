import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login(email: String!, password: String!) {
    login(email: String!, password: String!) {
      token
      user
    }
  }
`;

export const ADDUSER = gql`
  mutation addUser(input: UserInput!) {
    addUser(input: UserInput!) {
      username
      email
      password
      savedBooks
    }
  }
`;

export const SAVEBOOK = gql`
  mutation saveBook(input: BookInput!) {
    saveBook(input: BookInput!) {
      bookId
      authors
      description
      title
      image 
      link
    }
  }
`;

export const REMOVEBOOK = gql`
  mutation removeBook(bookiD: String!) {
    removeBook(bookiD: String!) {
      bookId
    }
  }
`;