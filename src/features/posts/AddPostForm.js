import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'

export default function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch()

  const canSave =
    [title, content, userId].every((val) => Boolean(val)) &&
    addRequestStatus === 'idle'

  const handleSavePost = async function (e) {
    e.preventDefault()

    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (err) {
        console.error('Fail to save the post: ', err)
      } finally {
        setAddRequestStatus('idle')
      }
    }
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
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
