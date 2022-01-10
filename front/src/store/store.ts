import { configureStore } from '@reduxjs/toolkit'
import { quotesReducer } from './quotes-slicer'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    quotesReducer,
  },
  middleware: [thunk],
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
