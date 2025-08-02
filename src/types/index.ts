import { configureStore } from '@reduxjs/toolkit'
import resumeReducer from '../store/resumeSlice'
import authReducer from '../store/authSlice'

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch