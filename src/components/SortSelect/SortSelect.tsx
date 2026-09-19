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

  const getLabel = (val: string) => {
    const match = options.find((option) => option.value === val)
    return match ? match.label : ''
  }

  return (
    <FormControl
      size="small"
      sx={{
        minWidth: { xs: '5.5rem', sm: '9rem' },
        '& .MuiInputLabel-root': { fontSize: { xs: '0.7rem', sm: '1rem' } },
        '& .MuiInputLabel-shrink': { fontSize: { xs: '0.75rem', sm: '0.85rem' } },
        '& .MuiSelect-select': { fontSize: { xs: '0.7rem', sm: '0.85rem' }, py: { xs: 0.5, sm: 1 } },
      }}
    >
      <InputLabel id="sort-select-label" shrink>Sort by</InputLabel>
      <Select
        labelId="sort-select-label"
        label="Sort by"
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={getLabel}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value} sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default SortSelect