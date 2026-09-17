import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material'

interface SortOption {
  value: string
  label: string
}

interface SortSelectProps {
  value: string
  onChange: (value: string) => void
  options: SortOption[]
}

function SortSelect({ value, onChange, options }: SortSelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: '9rem' }}>
      <InputLabel id="sort-select-label">Sort by</InputLabel>
      <Select labelId="sort-select-label" label="Sort by" value={value} onChange={handleChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SortSelect