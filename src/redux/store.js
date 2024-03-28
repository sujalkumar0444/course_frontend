import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import courseContentSlice from './slices/couresContentSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer,
    coursecontent:courseContentSlice
  },
})