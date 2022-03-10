import { gql } from "apollo-server-micro";

export const typeDefs = gql`

type User {
    ids: String
    username: String
    password: String
}

type Query
{
    users: [User]!,

}`;


