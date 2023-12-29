import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
import UpdateAuthor from './UpdateAuthor';

const Authors = (props) => {

  const { data, loading } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {!loading && data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <UpdateAuthor />
    </div>
  )
}

export default Authors
