import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs, useEffect } from 'storybook/preview-api'
import SearchResults from './SearchResults'
import { makeRepo } from '../../../test/makeRepo'

const MESSAGES: Record<string, string | null> = {
  None: null,
  'Rate limit': 'GitHub search limit reached. Wait a moment and try again.',
  'Network error': 'Something went wrong. Check your connection and try again.',
}

const sampleResults = [
  makeRepo({ id: 1, full_name: 'facebook/react' }),
  makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900 }),
  makeRepo({ id: 3, full_name: 'angular/angular', stargazers_count: 95000 }),
]

const meta: Meta<typeof SearchResults> = {
  title: 'Features/SearchResults',
  component: SearchResults,
  args: {
    status: 'success',
    errorMessage: 'None',
    results: sampleResults,
    hasMore: true,
    loadingMore: false,
    sort: 'stars',
    onSortChange: () => {},
    onLoadMore: () => {},
    onBack: () => {},
  },
  argTypes: {
    sort: { table: { disable: true } },
    status: {
      control: 'radio',
      options: ['success', 'loading', 'error'],
    },
    errorMessage: {
      control: 'select',
      options: Object.keys(MESSAGES),
      if: { arg: 'status', neq: 'loading' },
    },
    hasMore: { if: { arg: 'status', eq: 'success' } },
    loadingMore: { if: { arg: 'hasMore', truthy: true } },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()

    useEffect(() => {
      if (args.status === 'error' && args.errorMessage === 'None') {
        updateArgs({ errorMessage: 'Rate limit' })
      }
    }, [args.status, args.errorMessage])

    return <SearchResults {...args} errorMessage={MESSAGES[args.errorMessage ?? 'None'] ?? null} />
  },
}

export default meta

type Story = StoryObj<typeof SearchResults>

export const WithResults: Story = {}

export const NoResults: Story = {
  args: { results: [], hasMore: false },
}

export const Loading: Story = {
  args: { status: 'loading' },
}

export const RateLimitError: Story = {
  args: { status: 'error', errorMessage: 'Rate limit' },
}

export const LoadingMore: Story = {
  args: { loadingMore: true },
}

export const LoadMoreFailed: Story = {
  args: { errorMessage: 'Rate limit' },
}