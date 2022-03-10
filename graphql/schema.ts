import { gql } from "apollo-server-micro";

export const typeDefs = gql`
type Link {
    id: String
    title: String
    description: String
    url: String
    category: String
    imageUrl: String
    users: [String]
}

type Note {
    id: String
    title: String
    content: String
}


type User {
    id: String
    username: String
    password: String
    email: String
    name: String
}

type Query
{
    links: [Link]!,
    notes: [Note]!,
    users: [User]!,

}

type Mutation
{
    userRegistration(username: String!, password: String!): User!,
    userLogin(username: String!, password: String!): User!,
}


`;


