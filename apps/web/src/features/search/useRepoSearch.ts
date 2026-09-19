import { useEffect, useState } from 'react'
import { useSearchReposQuery, type SearchSort } from '../../api/githubApi'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import type { GithubRepo } from '../../types/github'

export type SearchStatus = 'loading' | 'success' | 'error'

interface UseRepoSearchResult {
  searchInput: string
  setSearchInput: (value: string) => void
  hasSearched: boolean
  sort: SearchSort
  setSort: (sort: SearchSort) => void
  results: GithubRepo[]
  status: SearchStatus
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
  const [loadingMore, setLoadingMore] = useState(false)

  const debouncedSearch = useDebouncedValue(searchInput, 500)
  const hasSearched = debouncedSearch.trim() !== ''

  const { data, isFetching, isError } = useSearchReposQuery(
    { searchTerm: debouncedSearch, page, sort },
    { skip: !hasSearched }
  )

  useEffect(() => {
    setPage(1)
    setAllResults([])
    setLoadingMore(false)
  }, [debouncedSearch, sort])

  useEffect(() => {
    if (!data) return
    setAllResults((prev) => (page === 1 ? data.items : [...prev, ...data.items]))
    setLoadingMore(false)
  }, [data, page])

  const loadMore = () => {
    setLoadingMore(true)
    setPage((p) => p + 1)
  }

  const reset = () => {
    setSearchInput('')
    setPage(1)
    setAllResults([])
    setLoadingMore(false)
  }

  const hasMore = data ? allResults.length < data.total_count : false

  const status: SearchStatus = isError ? 'error' : isFetching && page === 1 ? 'loading' : 'success'

  return {
    searchInput,
    setSearchInput,
    hasSearched,
    sort,
    setSort,
    results: allResults,
    status,
    hasMore,
    loadingMore,
    loadMore,
    reset,
  }
}