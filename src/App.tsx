import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import SearchResults from './features/search/SearchResults/SearchResults'
import TrackedView from './features/tracked/TrackedView/TrackedView'
import { useSearchReposQuery, type SearchSort } from './api/githubApi'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import type { GithubRepo } from './types/github'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SearchSort>('')
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

  const handleLoadMore = () => {
    setLoadingMore(true)
    setPage((p) => p + 1)
  }

  const handleBack = () => {
    setSearchInput('')
    setPage(1)
    setAllResults([])
    setLoadingMore(false)
  }

  const hasMore = data ? allResults.length < data.total_count : false

  const status: 'loading' | 'success' | 'error' = isError
    ? 'error'
    : isFetching && page === 1
    ? 'loading'
    : 'success'

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <Navbar searchInput={searchInput} onSearchChange={setSearchInput} />
    <Container maxWidth={false} sx={{ width: '100%', maxWidth: '80rem', mx: 'auto', py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}>
        {hasSearched ? (
          <SearchResults
            status={status}
            results={allResults}
            hasMore={hasMore}
            loadingMore={loadingMore}
            sort={sort}
            onSortChange={setSort}
            onLoadMore={handleLoadMore}
            onBack={handleBack}
          />
        ) : (
          <TrackedView />
        )}
      </Container>
    </Box>
  )
}

export default App