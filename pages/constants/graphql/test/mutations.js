import { gql } from "@apollo/client"


export const UPSERT_NOTES = gql`
mutation UpsertNotes($title: String!, $content: String!, $id: Int) {
  upsertNotes(title: $title, content: $content, id: $id ) {
    id
    title
    content
  }
}
`;

export const DELETE_NOTE = gql`
mutation DeleteNote($id: Int!) {
  deleteNote(id: $id) {
    id
  }
}
`;




