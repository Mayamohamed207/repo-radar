import { useState } from 'react'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import SearchResults from './features/search/SearchResults/SearchResults'
import { useSearchReposQuery } from './api/githubApi'
import { useDebouncedValue } from './hooks/useDebouncedValue'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, 500)

  const { data, isFetching, isError } = useSearchReposQuery(debouncedSearch, {
    skip: debouncedSearch.trim() === '',
  })

  return (
    <Box sx={{ minHeight: '100vh', width: '100%' }}>
      <Navbar searchInput={searchInput} onSearchChange={setSearchInput} />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <SearchResults
          results={data?.items}
          isFetching={isFetching}
          isError={isError}
          hasSearched={debouncedSearch.trim() !== ''}
        />
      </Container>
    </Box>
  )
}

export default App