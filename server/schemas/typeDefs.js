const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    points: Int
    timeOut: String
    timeIn: String
    likeCount: Int
    thoughtsCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    likeCount: Int
    dislikeCount: Int
    reactions: [Reaction]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
    users: [User]
    user(username: String!): User
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    likeThought(thoughtId: ID!): Thought
    dislikeThought(thoughtId: ID!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    checkout(credits: String!, price: Int!): Checkout
    recharge(point: Int!): User
  }
  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;
