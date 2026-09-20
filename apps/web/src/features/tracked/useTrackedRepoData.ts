import { useMemo } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import type { RootState } from '../../store/store'
import { githubApi } from '../../api/githubApi'
import type { GithubRepo } from '../../types/github'

export function useTrackedRepoData(): GithubRepo[] {
  const trackedRefs = useSelector((state: RootState) => state.tracked.repos)

  const repos = useSelector(
    (state: RootState) =>
      trackedRefs.map((ref) => githubApi.endpoints.getRepoByFullName.select(ref.full_name)(state).data),
    shallowEqual
  )

  return useMemo(() => repos.filter((repo): repo is GithubRepo => repo !== undefined), [repos])
}