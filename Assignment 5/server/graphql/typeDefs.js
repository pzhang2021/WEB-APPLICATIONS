import { gql } from "@apollo/server";

export default gql`
  type Todo {
    title: String!
    description: String!
    isDone: Boolean!
    time: Time!
    author: String!
    isUrgent: Boolean!
    todoId: String!
    userId: String!
  }
  type Time {
    Day: String!
    Hour: Int!
    Minute: Int!
  }
  type User {
    username: String!
    email: String!
    password: String!
    userId: String!
  }
`;
