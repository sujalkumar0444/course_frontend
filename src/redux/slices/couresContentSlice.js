import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  courseContent: {},
}

export const courseContentSlice = createSlice({
  name: 'courseContent',
  initialState,
  reducers: {
    setCourseData: (state, action) => {
      state.courseContent=action.payload;
      // console.log("reducerdata:",action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const {setCourseData } = courseContentSlice.actions

export default courseContentSlice.reducer