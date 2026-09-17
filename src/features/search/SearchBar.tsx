import { useState } from 'react'
import { TextField, Box } from '@mui/material'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useSearchReposQuery } from '../../api/githubApi'

function SearchBar() {
  const [searchInput, setSearchInput] = useState('')
  const debouncedSearch = useDebouncedValue(searchInput, 500)

  const { data, isFetching, isError } = useSearchReposQuery(debouncedSearch, {
    skip: debouncedSearch.trim() === '',
  })

  return (
    <Box sx={{ width: '100%', maxWidth: '40rem', mx: 'auto' }}>
      <TextField
        fullWidth
        label="Search GitHub repositories"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      {isFetching && <p>Loading...</p>}
      {isError && <p>Something went wrong</p>}
      {data && <p>{data.total_count} results found</p>}
    </Box>
  )
}

export default SearchBar