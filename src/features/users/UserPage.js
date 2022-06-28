import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

export default function UserPage() {
  const { userId } = useParams()
  const user = useSelector((state) => selectUserById(state, userId))
  const userPosts = useSelector((state) => selectPostsByUser(state, userId))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>
        {userPosts.length > 0 &&
          userPosts.map((post) => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link>
            </li>
          ))}
      </ul>
    </section>
  )
}
