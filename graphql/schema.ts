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

type Query
{
    links: [Link]!,
    notes: [Note]!,

}`;


