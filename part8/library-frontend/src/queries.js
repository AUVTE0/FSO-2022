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

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  author {
    name
  }
  published
  genres
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

export const FILTERED_BOOKS = gql`
query ($genre: String!){
  allBooks (genre: $genre){
    ...BookDetails
  }
}
${BOOK_DETAILS}
`

