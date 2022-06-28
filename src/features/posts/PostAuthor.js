import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

export default function PostAuthor({ authorId }) {
  const author = useSelector((state) => selectUserById(state, authorId))
  return <span>By {author ? author.name : 'Unknown Author'}</span>
}
