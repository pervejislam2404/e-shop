import { configureStore } from '@reduxjs/toolkit'
import stateReducer from './slice/statesSlice'

export const store = configureStore({
  reducer: {
      stateContainer:  stateReducer,
  },
  
})