import { TextField, Box, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

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
        sx={{
          '& .MuiOutlinedInput-root': {
            transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            boxShadow: '0 0 0 0.2rem color-mix(in srgb, var(--color-primary) 20%, transparent)',
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: value ? (
              <InputAdornment position="end">
                <IconButton size="small" onClick={() => onChange('')}>
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />
    </Box>
  )
}

export default SearchBar