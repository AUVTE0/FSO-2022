import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
mutation ($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    published
    genres
  }
}
`

export const UPDATE_AUTHOR = gql`
mutation ($name: String!, $born: Int!){
  editAuthor (
    name: $name,
    setBornTo: $born
  ) {
    name
    born
  }
}
`