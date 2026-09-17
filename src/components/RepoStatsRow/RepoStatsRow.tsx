import { Box, Typography } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ForkRightIcon from '@mui/icons-material/ForkRight'

interface RepoStatsRowProps {
  stars: number
  openIssues: number
  forks: number
}

function RepoStatsRow({ stars, openIssues, forks }: RepoStatsRowProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1.5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <StarIcon sx={{ fontSize: '1.1rem', color: 'var(--color-star)' }} />
        <Typography variant="body2">{stars.toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ReportProblemOutlinedIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
        <Typography variant="body2">{openIssues.toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <ForkRightIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
        <Typography variant="body2">{forks.toLocaleString()}</Typography>
      </Box>
    </Box>
  )
}

export default RepoStatsRow