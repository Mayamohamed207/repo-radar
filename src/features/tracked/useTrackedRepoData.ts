import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { githubApi } from '../../api/githubApi'
import type { GithubRepo, TrackedRepoRef } from '../../types/github'

function makeSelectLiveRepos(trackedRefs: TrackedRepoRef[]) {
  return createSelector(
    (state: RootState) => state,
    (state: RootState) =>
      trackedRefs
        .map((ref) => githubApi.endpoints.getRepoByFullName.select(ref.full_name)(state).data)
        .filter((repo): repo is GithubRepo => repo !== undefined)
  )
}

export function useTrackedRepoData(): GithubRepo[] {
  const trackedRefs = useSelector((state: RootState) => state.tracked.repos)
  const selectLiveRepos = useMemo(() => makeSelectLiveRepos(trackedRefs), [trackedRefs])
  return useSelector(selectLiveRepos)
}