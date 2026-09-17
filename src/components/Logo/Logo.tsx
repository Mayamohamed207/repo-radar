import { Box, Typography } from '@mui/material'
import RadarIcon from '@mui/icons-material/Radar'

function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '2.25rem',
          height: '2.25rem',
          borderRadius: '0.6rem',
          bgcolor: 'primary.main',
        }}
      >
        <RadarIcon sx={{ fontSize: '1.4rem', color: '#ffffff' }} />
      </Box>

      <Typography
        variant="h6"
        component="span"
        sx={{ fontWeight: 800, letterSpacing: '-0.03em' }}
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