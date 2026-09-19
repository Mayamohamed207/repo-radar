import { Box, Container } from '@mui/material'
import { Navbar } from '@repo-radar/ui'
import SearchBar from './features/search/SearchBar/SearchBar'
import SearchResults from './features/search/SearchResults/SearchResults'
import TrackedView from './features/tracked/TrackedView/TrackedView'
import { useRepoSearch } from './features/search/useRepoSearch'

function App() {
  const search = useRepoSearch()

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <Navbar
        searchSlot={
          <SearchBar value={search.searchInput} onChange={search.setSearchInput} />
        }
        onLogoClick={search.reset}
      />
      <Container
        maxWidth={false}
        sx={{ width: '100%', maxWidth: '80rem', mx: 'auto', py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3 } }}
      >
        {search.hasSearched ? (
          <SearchResults
            status={search.status}
            results={search.results}
            hasMore={search.hasMore}
            loadingMore={search.loadingMore}
            sort={search.sort}
            onSortChange={search.setSort}
            onLoadMore={search.loadMore}
            onBack={search.reset}
          />
        ) : (
          <TrackedView />
        )}
      </Container>
    </Box>
  )
}

export default App