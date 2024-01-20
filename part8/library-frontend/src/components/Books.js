import { useQuery, useSubscription } from "@apollo/client"
import { ALL_BOOKS, FILTERED_BOOKS } from "../queries"
import { useState, useEffect } from "react";
import { BOOK_ADDED } from "../subscriptions";

const Books = (props) => {

  const [ genre, setGenre ] = useState(null);
  const { data, isLoading } = useQuery(ALL_BOOKS);
  const { data: dataByGenre, isLoading: isLoadingByGenre } = useQuery(FILTERED_BOOKS, {
    variables: { genre },
  });

  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    if(genre && !isLoadingByGenre && dataByGenre){
      setFilteredData(dataByGenre)
    }
    if(!genre && !isLoading && data){
      setFilteredData(data);
    }
  }, [data, isLoading, dataByGenre, isLoadingByGenre, genre])

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`New book added: ${data.data.bookAdded.title}!`)
    }
  })

  const allGenres = data ? new Set(data.allBooks.reduce((a, n) => a.concat(n.genres), [])) : new Set();

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {genre && <p>in genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredData && filteredData.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {[...allGenres].map((g) => 
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
