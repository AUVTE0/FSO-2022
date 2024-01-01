import { gql } from '@apollo/client'

export const ME = gql`
query {
  me {
    favoriteGenre
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const FILTERED_BOOKS = gql`
query ($genre: String!){
  allBooks (genre: $genre){
    title
    author {
      name
    }
    published
    genres
  }
}
`