import { configureStore } from '@reduxjs/toolkit'
import tableReducer from "../redux/tableSlice"

export const store = configureStore({
  reducer: {
    table: tableReducer
  },
})
