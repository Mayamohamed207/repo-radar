import { Box } from '@mui/material'
import Logo from './components/Logo'
import SearchBar from './features/search/SearchBar'

function App() {
  return (
    <Box sx={{ minHeight: '100vh', width: '100%', p: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Logo />
      </Box>
      <SearchBar />
    </Box>
  )
}

export default App