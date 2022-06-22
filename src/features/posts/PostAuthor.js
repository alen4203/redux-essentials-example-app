import { useSelector } from 'react-redux'

export default function PostAuthor({ authorId }) {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === authorId)
  )
  return <span>By {author ? author.name : 'Unknown Author'}</span>
}
