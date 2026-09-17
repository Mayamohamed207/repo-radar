import type { Meta, StoryObj } from '@storybook/react-vite'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TrackedCard from './TrackedCard'
import { githubApi } from '../../../api/githubApi'
import trackedReducer from '../trackedRepos'
import type { GithubRepo, TrackedRepoRef } from '../../../types/github'

function makeRepo(overrides: Partial<GithubRepo> = {}): GithubRepo {
  return {
    id: 999101,
    name: 'react',
    full_name: 'facebook/react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    html_url: 'https://github.com/facebook/react',
    stargazers_count: 218000,
    open_issues_count: 1450,
    forks_count: 42300,
    language: 'JavaScript',
    owner: { login: 'facebook', avatar_url: 'https://github.com/facebook.png' },
    pushed_at: '2026-09-01T12:00:00Z',
    ...overrides,
  }
}

type MockResult =
  | { type: 'success'; data: GithubRepo }
  | { type: 'error'; message: string }
  | { type: 'pending' }

function storeWithMockedApi(result: MockResult) {
  const mockApi = githubApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
      getRepoByFullName: builder.query<GithubRepo, string>({
        queryFn: () => {
          if (result.type === 'success') return { data: result.data }
          if (result.type === 'error') return { error: { status: 403, data: result.message } }
          return new Promise(() => {}) // never resolves to stay in loading state on purpose
        },
      }),
    }),
  })

  return configureStore({
    reducer: {
      tracked: trackedReducer,
      [mockApi.reducerPath]: mockApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mockApi.middleware),
  })
}

const meta: Meta<typeof TrackedCard> = {
  title: 'Features/TrackedCard',
  component: TrackedCard,
}

export default meta

type Story = StoryObj<typeof TrackedCard>

const repoRef: TrackedRepoRef = { id: 999101, full_name: 'facebook/react' }

export const Loaded: Story = {
  args: { repoRef },
  decorators: [
    (Story) => (
      <Provider store={storeWithMockedApi({ type: 'success', data: makeRepo() })}>
        <Story />
      </Provider>
    ),
  ],
}

export const Loading: Story = {
  args: { repoRef },
  decorators: [
    (Story) => (
      <Provider store={storeWithMockedApi({ type: 'pending' })}>
        <Story />
      </Provider>
    ),
  ],
}

export const FailedToLoad: Story = {
  args: { repoRef },
  decorators: [
    (Story) => (
      <Provider store={storeWithMockedApi({ type: 'error', message: 'API rate limit exceeded' })}>
        <Story />
      </Provider>
    ),
  ],
}