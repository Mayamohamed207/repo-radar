import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchResults from './SearchResults'
import { makeRepo } from '../../../test/makeRepo'

const meta: Meta<typeof SearchResults> = {
  title: 'Features/SearchResults',
  component: SearchResults,
}

export default meta

type Story = StoryObj<typeof SearchResults>

export const WithResults: Story = {
  args: {
    status: 'success',
    results: [
      makeRepo({ id: 1, full_name: 'facebook/react' }),
      makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900 }),
      makeRepo({ id: 3, full_name: 'angular/angular', stargazers_count: 95000 }),
    ],
    hasMore: true,
    loadingMore: false,
    onLoadMore: () => {},
    onBack: () => {},
  },
}

export const NoResults: Story = {
  args: {
    status: 'success',
    results: [],
    hasMore: false,
    loadingMore: false,
    onLoadMore: () => {},
    onBack: () => {},
  },
}

export const Loading: Story = {
  args: {
    status: 'loading',
    results: [],
    hasMore: false,
    loadingMore: false,
    onLoadMore: () => {},
    onBack: () => {},
  },
}

export const RateLimitError: Story = {
  args: {
    status: 'error',
    results: [],
    hasMore: false,
    loadingMore: false,
    onLoadMore: () => {},
    onBack: () => {},
  },
}



export const LoadingMore: Story = {
  args: {
    status: 'success',
    results: [
      makeRepo({ id: 1, full_name: 'facebook/react' }),
      makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900 }),
    ],
    hasMore: true,
    loadingMore: true,
    onLoadMore: () => {},
    onBack: () => {},
  },
}