import gql from 'graphql-tag';

export const typeDefs = gql`
  type Employee {
    id: Int!
    firstName: String!
    lastName: String!
    age: Int!
    phoneNumber: String!
    email: String!
    jobLocation: String!
    createdAt: String!
    posts: [Post!]!
  }

  type Post {
    id: Int!
    title: String!
    content: String!
    employee: Employee!
    createdAt: String!
    comments: [Comment!]!
  }

  type Comment {
    id: Int!
    content: String!
    createdAt: String!
    post: Post!
  }

  type Query {
    getEmployees: [Employee!]!
    getEmployee(id: Int!): Employee
    getPosts: [Post!]!
    getPost(id: Int!): Post
    getComments: [Comment!]!
    getComment(id: Int!): Comment
  }

  type Mutation {
    # Employee Mutations
    createEmployee(
      firstName: String!
      lastName: String!
      age: Int!
      phoneNumber: String!
      email: String!
      jobLocation: String!
    ): Employee!
  
    updateEmployee(
      id: Int!
      firstName: String
      lastName: String
      age: Int
      phoneNumber: String
      email: String
      jobLocation: String
    ): Employee!
  
    deleteEmployee(id: Int!): Boolean!
  
    # Post Mutations
    createPost(
      title: String!
      content: String!
      employeeId: Int!
    ): Post!
  
    updatePost(
      id: Int!
      title: String
      content: String
    ): Post!
  
    deletePost(id: Int!): Boolean!
  
    # Comment Mutations
    createComment(
      content: String!
      postId: Int!
    ): Comment!
  
    updateComment(
      id: Int!
      content: String
    ): Comment!
  
    deleteComment(id: Int!): Boolean!
  }
`;
