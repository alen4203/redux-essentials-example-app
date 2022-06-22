import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '0', name: 'Alen Wang' },
  { id: '1', name: 'Milu Chiang' },
  { id: '2', name: 'Meg Chang' },
]

const usersSlice = createSlice({
  name: 'usersSlice',
  initialState,
  reducers: {},
})

export default usersSlice.reducer
