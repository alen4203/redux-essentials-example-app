import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get('/fakeApi/posts')
    return response.data
  },
  {
    // if already fetched / fetching, do not fetch (return false)
    condition: (_, { getState }) => {
      // 'getState' returns the root state
      const { posts } = getState()
      const fetchStatus = posts.status
      if (fetchStatus === 'fulfilled' || fetchStatus === 'loading') return false
    },
  }
)

export const addNewPost = createAsyncThunk(
  'posts/addNewPosts',
  // the payload creator receives the partial {title, content, user} object
  async (initialPost) => {
    // send the request to the fake api server
    const response = await client.post('/fakeApi/posts', initialPost)
    // the response includes the complete post object, including unique ID
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const updatedPost = state.entities[id]
      if (!updatedPost) return state
      updatedPost.title = title
      updatedPost.content = content
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.entities[postId]
      if (!existingPost) return state
      existingPost.reactions[reaction]++
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        // Use 'upsertMany' reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
    // Use 'addOne' reducer for the fulfilled case
    builder.addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

export const { postUpdated, reactionAdded } = postsSlice.actions

// Export the customized selectors for this adapter using 'getSelectors'
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
  // Pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors((state) => state.posts)

export const selectPostsByUser = createSelector(
  // input selectors (receive all arguments from calling)
  [selectAllPosts, (state, userId) => userId],
  // output selector (only re-run when input selector return has changed)
  (posts, userId) => posts.filter((post) => post.user === userId)
)

export default postsSlice.reducer
