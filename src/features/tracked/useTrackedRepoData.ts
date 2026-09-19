import { useSelector, shallowEqual } from 'react-redux'
import type { RootState } from '../../store/store'
import { githubApi } from '../../api/githubApi'
import type { GithubRepo } from '../../types/github'

export function useTrackedRepoData(): GithubRepo[] {
  return useSelector((state: RootState) => {
    return state.tracked.repos
      .map((ref) => githubApi.endpoints.getRepoByFullName.select(ref.full_name)(state).data)
      .filter((repo): repo is GithubRepo => repo !== undefined)
  }, shallowEqual)
}