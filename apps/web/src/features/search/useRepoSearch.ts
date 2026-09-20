import { useEffect, useState } from 'react'
import { useSearchReposQuery, type SearchSort } from '../../api/githubApi'
import { getErrorStatus } from '../../api/getErrorStatus'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import type { GithubRepo } from '../../types/github'

export type SearchStatus = 'loading' | 'success' | 'error'

function getSearchErrorMessage(error: unknown): string {
  const status = getErrorStatus(error)

  if (status === 403 || status === 429) {
    return 'GitHub search limit reached. Wait a moment and try again.'
  }
  if (status === 422) {
    return 'GitHub could not run this search. Try a different search term.'
  }
  return 'Something went wrong while searching. Please try again.'
}

interface UseRepoSearchResult {
  searchInput: string
  setSearchInput: (value: string) => void
  hasSearched: boolean
  sort: SearchSort
  setSort: (sort: SearchSort) => void
  results: GithubRepo[]
  status: SearchStatus
  errorMessage: string | null
  hasMore: boolean
  loadingMore: boolean
  loadMore: () => void
  reset: () => void
}

export function useRepoSearch(): UseRepoSearchResult {
  const [searchInput, setSearchInput] = useState('')
  const [sort, setSort] = useState<SearchSort>('')
  const [page, setPage] = useState(1)
  const [allResults, setAllResults] = useState<GithubRepo[]>([])

  const debouncedSearch = useDebouncedValue(searchInput, 500)
  const hasSearched = debouncedSearch.trim() !== '' && searchInput.trim() !== ''

  const { data, currentData, error, isFetching, isError, refetch } = useSearchReposQuery(
    { searchTerm: debouncedSearch, page, sort },
    { skip: !hasSearched }
  )

  useEffect(() => {
    if (!currentData) return
    setAllResults((prev) => (page === 1 ? currentData.items : [...prev, ...currentData.items]))
  }, [currentData, page])

  const handleSearchChange = (value: string) => {
    setSearchInput(value)
    setPage(1)
  }

  const handleSortChange = (value: SearchSort) => {
    setSort(value)
    setPage(1)
  }

  const loadMore = () => {
    if (isError) {
      refetch()
    } else {
      setPage((p) => p + 1)
    }
  }

  const reset = () => {
    setSearchInput('')
    setPage(1)
  }

  const isFirstPage = page === 1
  const hasMore = data ? allResults.length < data.total_count : false
  const loadingMore = !isFirstPage && isFetching
  const errorMessage = isError ? getSearchErrorMessage(error) : null

  const status: SearchStatus =
    isError && isFirstPage ? 'error' : isFetching && isFirstPage ? 'loading' : 'success'

  return {
    searchInput,
    setSearchInput: handleSearchChange,
    hasSearched,
    sort,
    setSort: handleSortChange,
    results: allResults,
    status,
    errorMessage,
    hasMore,
    loadingMore,
    loadMore,
    reset,
  }
}