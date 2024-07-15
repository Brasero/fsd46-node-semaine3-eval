import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getRealisationsFromApi = createAsyncThunk(
  "getRealisation",
  async (api, thunkAPI) => {
    try {
      const result = await api.get("/secure/realisation")
      return result.data
    } catch(e) {
      thunkAPI.rejectWithValue(e)
    }
  }
)

export const updateRealisationQuantity = createAsyncThunk(
  "updateRealisationQuantity",
  async ({api, qty, id}, thunkAPI ) => {
    try {
      const result = await api.put("/secure/updateRealisationQuantity", {id, qty})
      return result.data
    } catch(e) {
      thunkAPI.rejectWithValue(e)
    }
  }
)

const realisationSlice = createSlice({
  name: "realisation",
  initialState: {
    items: [],
    loadingState: "idle",
    filters: {
      materials: [],
      categories: []
    }
  },
  reducers: {
    toggleFilters(state, action) {
      state.filters[action.payload.filter] = state.filters[action.payload.filter].includes(action.payload.value) ?
        state.filters[action.payload.filter].filter((filter) => filter !== action.payload.value)
        :
        state.filters[action.payload.filter].concat([action.payload.value])
    },
    resetFilters(state,action) {
      state.filters = {
        materials: [],
        categories: []
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRealisationsFromApi.pending, (state,action) => {
      state.loadingState = "pending"
    })
      .addCase(getRealisationsFromApi.fulfilled, (state, action) => {
        state.items = action.payload.realisation
        state.loadingState = "loaded"
      })
      .addCase(getRealisationsFromApi.rejected, (state, action) => {
        state.loadingState = "errored"
      })
      .addCase(updateRealisationQuantity.pending, (state, action) => {
        state.loadingState = "pending"
      })
      .addCase(updateRealisationQuantity.fulfilled, (state, action) => {
        state.loadingState = "loaded"
        state.items = state.items.map(item => {
          if (item._id === action.payload.realisation._id) {
            return action.payload.realisation
          }
          return item
        })
      })
      .addCase(updateRealisationQuantity.rejected, (state, action) => {
        state.loadingState = "loaded"
      })
  }
})

export const {
  toggleFilters,
  resetFilters,
} = realisationSlice.actions;

export default realisationSlice.reducer;