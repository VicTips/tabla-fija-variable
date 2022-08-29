import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loan: "",
  nper: "",
  rate: "",
  gradient: "",
  type: "fixed"
}

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setLoan: (state, action) => {
      state.loan = action.payload
    },
    setNper: (state, action) => {
      state.nper = action.payload
    },
    setRate: (state, action) => {
      state.rate = action.payload
    },
    setGradient: (state, action) => {
      state.gradient = action.payload
    },
    changeType: (state, action) => {
      state.type = action.payload
    }
  },
})

export const { setLoan, setNper, setRate, setGradient, changeType } = tableSlice.actions

export default tableSlice.reducer
