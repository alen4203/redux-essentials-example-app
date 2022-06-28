import { Spinner } from '../../components/Spinner'
import { useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'
import { fetchPosts, selectPostIds, selectPostById } from './postsSlice'

let PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <PostAuthor authorId={post.user} />
      <TimeAgo timestamp={post.date} />
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}

PostExcerpt = memo(PostExcerpt)

export default function PostsList() {
  const dispatch = useDispatch()

  const orderedPostIds = useSelector(selectPostIds)
  const postsStatus = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)

  useEffect(() => {
    if (postsStatus === 'idle') dispatch(fetchPosts())
  }, [postsStatus, dispatch])

  const SucceededPosts = function () {
    return orderedPostIds.map((postId) => (
      <PostExcerpt postId={postId} key={postId} />
    ))
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {postsStatus === 'loading' && <Spinner text="loading..." />}
      {postsStatus === 'failed' && <div>{error}</div>}
      {postsStatus === 'succeeded' && SucceededPosts()}
    </section>
  )
}
