import { useState } from 'react'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import SearchResults from './features/search/SearchResults/SearchResults'
import TrackedView from './features/tracked/TrackedView/TrackedView'
import { useSearchReposQuery } from './api/githubApi'
import { useDebouncedValue } from './hooks/useDebouncedValue'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, 500)

  const hasSearched = debouncedSearch.trim() !== ''

  const { data, isFetching, isError } = useSearchReposQuery(debouncedSearch, {
    skip: !hasSearched,
  })

  return (
    <Box sx={{ minHeight: '100vh', width: '100%', bgcolor: 'background.default' }}>
      <Navbar searchInput={searchInput} onSearchChange={setSearchInput} />
      <Container maxWidth={false} sx={{ width: '100%', maxWidth: '80rem', mx: 'auto', py: 3, px: { xs: 2, sm: 3 } }}>
        {hasSearched ? (
          <SearchResults
            results={data?.items}
            isFetching={isFetching}
            isError={isError}
            hasSearched={hasSearched}
            onBack={() => setSearchInput('')}
          />
        ) : (
          <TrackedView />
        )}
      </Container>
    </Box>
  )
}

export default App