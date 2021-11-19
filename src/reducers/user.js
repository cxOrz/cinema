import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'Anonymous'
  },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload
    }
  }
})

export const { setUserName } = userSlice.actions
export default userSlice.reducer