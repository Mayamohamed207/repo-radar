import { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchResults from './SearchResults'
import { makeRepo } from '../../../test/makeRepo'

const meta: Meta<typeof SearchResults> = {
  title: 'Features/SearchResults',
  component: SearchResults,
  args: {
    errorMessage: null,
    sort: 'stars',
    onSortChange: () => {},
    onLoadMore: () => {},
    onBack: () => {},
  },
  render: function Render(args) {
    const [sort, setSort] = useState(args.sort)

    useEffect(() => {
      setSort(args.sort)
    }, [args.sort])

    return <SearchResults {...args} sort={sort} onSortChange={setSort} />
  },
}

export default meta

type Story = StoryObj<typeof SearchResults>

const sampleResults = [
  makeRepo({ id: 1, full_name: 'facebook/react' }),
  makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900 }),
  makeRepo({ id: 3, full_name: 'angular/angular', stargazers_count: 95000 }),
]

export const WithResults: Story = {
  args: {
    status: 'success',
    results: sampleResults,
    hasMore: true,
    loadingMore: false,
  },
}

export const NoResults: Story = {
  args: {
    status: 'success',
    results: [],
    hasMore: false,
    loadingMore: false,
  },
}

export const Loading: Story = {
  args: {
    status: 'loading',
    results: [],
    hasMore: false,
    loadingMore: false,
  },
}

export const RateLimitError: Story = {
  args: {
    status: 'error',
    errorMessage: 'GitHub search limit reached. Wait a moment and try again.',
    results: [],
    hasMore: false,
    loadingMore: false,
  },
}

export const LoadingMore: Story = {
  args: {
    status: 'success',
    results: sampleResults,
    hasMore: true,
    loadingMore: true,
  },
}

export const LoadMoreFailed: Story = {
  args: {
    status: 'success',
    errorMessage: 'GitHub search limit reached. Wait a moment and try again.',
    results: sampleResults,
    hasMore: true,
    loadingMore: false,
  },
}