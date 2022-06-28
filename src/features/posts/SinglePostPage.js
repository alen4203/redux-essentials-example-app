import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectPostById } from './postsSlice'

export default function SinglePostPage() {
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, postId))

  if (!post)
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor authorId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit
        </Link>
      </article>
    </section>
  )
}
