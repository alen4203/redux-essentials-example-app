import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  const handleSavePost = function (e) {
    e.preventDefault()

    dispatch(postAdded(title, content, userId))
    setTitle('')
    setContent('')
    setUserId('')
  }
  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSavePost}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          required
          id="postTitle"
          name="postTitle"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          onChange={(e) => setUserId(e.target.value)}
          value={userId}
        >
          <option value=""></option>
          {users.length > 0 &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>

        <label htmlFor="postContent">Post Content:</label>
        <textarea
          required
          id="postContent"
          name="postContent"
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button type="submit" disabled={!userId || !title || !content}>
          Save Post
        </button>
      </form>
    </section>
  )
}
