import { configureStore } from '@reduxjs/toolkit'
import { githubApi } from '../api/githubApi'
import trackedReposReducer from '../features/tracked/trackedRepos'

export const store = configureStore({
  reducer: {
    tracked: trackedReposReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(githubApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch