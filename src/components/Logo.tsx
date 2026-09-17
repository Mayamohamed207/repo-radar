import { Box, Typography } from '@mui/material'
import RadarIcon from '@mui/icons-material/Radar'

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.75rem',
          height: '2.75rem',
          borderRadius: '0.75rem',
          bgcolor: 'primary.main',
        }}
      >
        <RadarIcon sx={{ fontSize: '1.75rem', color: '#ffffff' }} />
      </Box>

      <Typography
        variant="h5"
        component="span"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.03em',
          fontSize: '1.5rem',
        }}
      >
        Repo
        <Box component="span" sx={{ color: 'primary.main' }}>
          Radar
        </Box>
      </Typography>
    </Box>
  )
}

export default Logo