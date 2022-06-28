import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice.js'
import usersReducer from '../features/users/usersSlice.js'
import notificationsReducer from '../features/notifications/notificationsSlice.js'

export default configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer,
    notifications: notificationsReducer,
  },
})
