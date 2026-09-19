import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from '@mui/material'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import TrackedCard from './TrackedCard'
import { githubApi } from '../../../api/githubApi'
import trackedReducer from '../trackedRepos'
import type { GithubRepo, TrackedRepoRef } from '../../../types/github'
import { makeRepo } from '../../../test/makeRepo'

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
          return new Promise(() => {})
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
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '24rem' }}>
        <Story />
      </Box>
    ),
  ],
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