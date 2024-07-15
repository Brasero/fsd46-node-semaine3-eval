import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getMaterialsList = createAsyncThunk(
  'getMaterialsList',
  async (api, thunkAPI) => {
    try {
      const res = await api.get("/secure/getMaterials")
      console.log(res)
      return res.data
    } catch(e) {
      thunkAPI.rejectWithValue(e)
    }
  }
)

const materialSlice = createSlice({
  name: "material",
  initialState: {
    items: [],
    loadingState: "idle"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMaterialsList.rejected, (state, action) => {
      state.items = []
      state.loadingState = "error"
    })
      .addCase(getMaterialsList.fulfilled, (state,action) => {
        state.items = action.payload
        state.loadingState = "fulfilled"
      })
      .addCase(getMaterialsList.pending, (state, action) => {
        state.loadingState = "pending"
      })
  }
})

export const {} = materialSlice.actions;

export default materialSlice.reducer;