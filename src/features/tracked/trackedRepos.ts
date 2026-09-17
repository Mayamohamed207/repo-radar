import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TrackedRepoRef } from '../../types/github'

const loadStorage = (): TrackedRepoRef[] => {
  try {
    const data = localStorage.getItem('tracked_repos')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

interface TrackedState {
  repos: TrackedRepoRef[]
}

const initialState: TrackedState = {
  repos: loadStorage(),
}

export const trackedRepos = createSlice({
  name: 'tracked',
  initialState,
  reducers: {
    trackRepo: (state, action: PayloadAction<TrackedRepoRef>) => {
      if (!state.repos.some((r) => r.id === action.payload.id)) {
        state.repos.push(action.payload)
        localStorage.setItem('tracked_repos', JSON.stringify(state.repos))
      }
    },
    untrackRepo: (state, action: PayloadAction<number>) => {
      state.repos = state.repos.filter((r) => r.id !== action.payload)
      localStorage.setItem('tracked_repos', JSON.stringify(state.repos))
    },
  },
})

export const { trackRepo, untrackRepo } = trackedRepos.actions
export default trackedRepos.reducer