import { useState } from 'react'
import { Box, Container } from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import SearchResults from './features/search/SearchResults/SearchResults'
import TrackedView from './features/tracked/TrackedView/TrackedView'

function App() {
  const [search, setSearch] = useState('')

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar searchInput={search} onSearchChange={setSearch} />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {search.trim() ? (
          <SearchResults query={search} onClear={() => setSearch('')} />
        ) : (
          <TrackedView />
        )}
      </Container>
    </Box>
  )
}

export default App