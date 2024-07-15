import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: "user",
  initialState: {
      connected: false
  },
  reducers: {
      setConnected(state, action) {
          state.connected = action.payload
      }
  }
})

export const {
    setConnected
} = userSlice.actions;

export default userSlice.reducer;