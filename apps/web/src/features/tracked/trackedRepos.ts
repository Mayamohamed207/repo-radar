import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TrackedRepoRef } from '../../types/github'

const STORAGE_KEY = 'tracked_repos'

const loadStorage = (): TrackedRepoRef[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveStorage = (repos: TrackedRepoRef[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(repos))
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
        saveStorage(state.repos)
      }
    },
    untrackRepo: (state, action: PayloadAction<number>) => {
      state.repos = state.repos.filter((r) => r.id !== action.payload)
      saveStorage(state.repos)
    },
  },
})

export const { trackRepo, untrackRepo } = trackedRepos.actions
export default trackedRepos.reducer