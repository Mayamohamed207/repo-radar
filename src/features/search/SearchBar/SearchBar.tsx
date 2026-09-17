import { TextField, Box, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: '32rem' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search GitHub repositories..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
    </Box>
  )
}

export default SearchBar