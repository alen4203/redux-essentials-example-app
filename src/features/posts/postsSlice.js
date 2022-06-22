import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello!',
    author: '0',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, sad: 0, eyes: 0 },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'Text!',
    author: '1',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, sad: 0, eyes: 0 },
  },
  {
    id: '3',
    title: 'Third Post',
    content: 'More Text!',
    author: '2',
    date: sub(new Date(), { minutes: 3 }).toISOString(),
    reactions: { thumbsUp: 0, hooray: 0, heart: 0, sad: 0, eyes: 0 },
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        //   state.push(action.payload)
        return [...state, action.payload]
      },
      // prepare for action.payload before running the reducer
      prepare: (title, content, userId) => {
        // we can do handle random id here
        return {
          // includs: payload, meta(optional), bool: error(optional)
          payload: {
            id: nanoid(),
            title,
            content,
            author: userId,
            // we cannot pass a class instance as payload
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, sad: 0, eyes: 0 },
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const updatedPost = state.find((post) => post.id === id)
      if (!updatedPost) return state
      updatedPost.title = title
      updatedPost.content = content
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.find((post) => post.id === postId)
      if (!existingPost) return state
      existingPost.reactions[reaction]++
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
