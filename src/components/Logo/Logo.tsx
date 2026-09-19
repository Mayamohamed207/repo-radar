import { Box, Typography } from '@mui/material'
import RadarIcon from '@mui/icons-material/Radar'

interface LogoProps {
  onClick?: () => void
}

function Logo({ onClick }: LogoProps) {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.75,
        flexShrink: 0,
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: '1.85rem', sm: '2.25rem' },
          height: { xs: '1.85rem', sm: '2.25rem' },
          borderRadius: '0.5rem',
          bgcolor: 'primary.main',
        }}
      >
        <RadarIcon sx={{ fontSize: { xs: '1.15rem', sm: '1.4rem' }, color: '#ffffff' }} />
      </Box>

      <Typography
        variant="h6"
        component="span"
        sx={{
          fontWeight: 800,
          letterSpacing: '-0.03em',
          color: 'var(--color-text-primary)',
          display: { xs: 'none', sm: 'inline' },
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