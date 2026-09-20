import type { Meta, StoryObj } from '@storybook/react-vite'
import TrackedView from './TrackedView'
import { store } from '../../../store/store'
import { githubApi } from '../../../api/githubApi'
import { trackRepo, untrackRepo } from '../trackedRepos'
import { makeRepo } from '../../../test/makeRepo'

const REPOS = [
  makeRepo({ id: 1, full_name: 'facebook/react', stargazers_count: 218000, open_issues_count: 1450, forks_count: 42300, language: 'JavaScript' }),
  makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900, open_issues_count: 220, forks_count: 8300, language: 'TypeScript' }),
  makeRepo({ id: 3, full_name: 'sveltejs/svelte', stargazers_count: 75000, open_issues_count: 380, forks_count: 3900, language: 'TypeScript' }),
  makeRepo({ id: 4, full_name: 'golang/go', stargazers_count: 125000, open_issues_count: 9200, forks_count: 17800, language: 'Go' }),
]

function seedStore(repos: typeof REPOS) {
  store.getState().tracked.repos.forEach((r) => store.dispatch(untrackRepo(r.id)))
  repos.forEach((repo) => {
    store.dispatch(githubApi.util.upsertQueryData('getRepoByFullName', repo.full_name, repo))
    store.dispatch(trackRepo(repo))
  })
}

const meta: Meta<typeof TrackedView> = {
  title: 'Features/TrackedView',
  component: TrackedView,
}

export default meta

type Story = StoryObj<typeof TrackedView>

export const WithRepos: Story = {
  loaders: [
    async () => {
      seedStore(REPOS)
      return {}
    },
  ],
}

export const Empty: Story = {
  loaders: [
    async () => {
      seedStore([])
      return {}
    },
  ],
}