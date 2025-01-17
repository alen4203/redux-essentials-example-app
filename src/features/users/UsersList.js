import { useSelector } from 'react-redux'
import { selectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

export default function UsersList() {
  const users = useSelector(selectAllUsers)

  return (
    <section>
      <h2>Users</h2>
      <ul>
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          ))}
      </ul>
    </section>
  )
}
