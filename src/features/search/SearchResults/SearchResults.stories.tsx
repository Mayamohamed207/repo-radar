import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchResults from './SearchResults'
import type { GithubRepo } from '../../../types/github'

function makeRepo(overrides: Partial<GithubRepo> = {}): GithubRepo {
  return {
    id: 999201,
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

const baseProps = {
  hasSearched: true,
  isFetching: false,
  isError: false,
  hasMore: false,
  loadingMore: false,
  onLoadMore: () => {},
  onBack: () => {},
}

const meta: Meta<typeof SearchResults> = {
  title: 'Features/SearchResults',
  component: SearchResults,
}

export default meta

type Story = StoryObj<typeof SearchResults>

export const WithResults: Story = {
  args: {
    ...baseProps,

    results: [
      makeRepo({ id: 1, full_name: 'facebook/react' }),
      makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900 }),
      makeRepo({ id: 3, full_name: 'angular/angular', stargazers_count: 95000 }),
    ],

    loadingMore: false
  },
}

export const Loading: Story = {
  args: {
    ...baseProps,
    results: [],
    isFetching: true,
  },
}

export const NoResults: Story = {
  args: {
    ...baseProps,
    results: [],
  },
}

export const RateLimitError: Story = {
  args: {
    ...baseProps,
    results: [],
    isError: true,
  },
}