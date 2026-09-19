import { Box, Typography } from '@mui/material'
import { PALETTE } from './chartConstants'

interface ChartBaseProps {
  labels: string[]
}

function ChartBase({ labels }: ChartBaseProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 1 }}>
      {labels.map((label, i) => (
        <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Box sx={{ width: '0.6rem', height: '0.6rem', borderRadius: '0.15rem', bgcolor: PALETTE[i % PALETTE.length] }} />
          <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{label}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default ChartBase