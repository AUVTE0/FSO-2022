import { gql } from "@apollo/client";
import { BOOK_DETAILS } from "./queries";

export const CREATE_BOOK = gql`
mutation ($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
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

export const LOGIN = gql`
mutation ($username: String!, $password: String!){
  login (
    username: $username,
    password: $password
  ) {
    value
  }
}
`