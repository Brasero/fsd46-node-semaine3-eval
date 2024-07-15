import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice.jsx";
import materialSlice from "./slice/materialSlice.js";
import realisationSlice from "./slice/realisationSlice.jsx";

const store = configureStore({
  reducer: {
    user: userSlice,
    materials: materialSlice,
    realisations: realisationSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([])
})

export default store