import { useQuery } from "@apollo/client"
import { ME, FILTERED_BOOKS } from "../queries"
import { useState, useEffect } from "react";

const Recommend = (props) => {
  const [ genre, setGenre ] = useState(null);
  const { data: userData } = useQuery(ME);
  const { data } = useQuery(FILTERED_BOOKS, {
    variables: { genre },
  });

  useEffect(() => {
    if(userData){
      setGenre(userData?.me?.favoriteGenre);
    }
  }, [userData]);

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      {genre && <p>books in your favorite genre <b>{genre}</b></p>}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {data?.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
