import { useSelector, useDispatch } from 'react-redux'
import { postUpdated } from './postsSlice'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function EditPostForm() {
  const { postId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleSavePost = function () {
    if (!title || !content) return
    dispatch(postUpdated({ id: postId, title, content }))
    navigate(`/posts/${postId}`)
  }
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          id="postTitle"
          name="postTitle"
          type="text"
          placeholder="What's on your mind?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="postContent">Post Content:</label>

        <textarea
          id="postContent"
          name="postContent"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button type="button" onClick={handleSavePost}>
          Save Post
        </button>
      </form>
    </section>
  )
}
