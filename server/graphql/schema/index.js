const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type User {
  _id: ID!
  email: String!
  password: String!
  phone: String
  firstName: String
  lastName: String
  about: String
  subscribedToNewsletter: String
}

type AuthData {
  email: String!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
}

type UsersNewsletterList {
  _id: ID!
  email: String!
}

type RootQuery {
    user: [User]
    login(email: String!, password: String!): AuthData
    getCurrentInfo(email: String!): User
}

type RootMutation {
    createUser(userInput: UserInput): AuthData
    updateCurrentInfo(email: String!, phone: String, firstName: String, lastName: String, about: String, subscribedToNewsletter: String): User
    createNewsletterUser(email: String!): UsersNewsletterList
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
