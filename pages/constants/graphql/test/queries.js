import { gql } from "@apollo/client"


export const GET_NOTE_LIST = gql`
query{
    notes{
        id
        title
        content
    }
}
`;