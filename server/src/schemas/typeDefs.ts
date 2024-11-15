const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

 type Book {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
 } 

  input UserInput {
    username: String!
    email: String!
    password: String!
    savedBooks: [BookInput]
  }

input BookInput {
  bookId: String
  authors: [String]
  description: String
  title: String
  image: String
  link: String
 } 


 type Auth {
    token: ID!
    user: User
 }

type Query {
me: User
}

type Mutation {
login(email: String!, password: String!): Auth
addUser(input: UserInput!): Auth
saveBook(input: BookInput!): User
removeBook(bookId: String!): User
}

`;

export default typeDefs;