import { Box, Typography, Paper } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import type { GithubRepo } from '../../../types/github'

interface StatsBarProps {
  repos: GithubRepo[]
}

function StatsBar({ repos }: StatsBarProps) {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0)
  const totalIssues = repos.reduce((sum, r) => sum + r.open_issues_count, 0)
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0)

  const stats = [
    { label: 'Total Stars', value: totalStars, icon: StarIcon, color: 'var(--color-star)' },
    { label: 'Open Issues', value: totalIssues, icon: ReportProblemOutlinedIcon, color: 'var(--color-warning)' },
    { label: 'Total Forks', value: totalForks, icon: ForkRightIcon, color: 'var(--color-primary-blue)' },
  ]

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        mb: 3,
        borderRadius: '0.9rem',
        overflow: 'hidden',
      }}
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <Box
            key={stat.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.75, sm: 1.5 },
              px: { xs: 1, sm: 3 },
              py: { xs: 1.25, sm: 2.5 },
              minWidth: 0,
              borderLeft: i > 0 ? '1px solid' : 'none',
              borderColor: 'divider',
            }}
          >
            <Box
              sx={{
                width: { xs: '1.8rem', sm: '2.75rem' },
                height: { xs: '1.8rem', sm: '2.75rem' },
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                bgcolor: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
              }}
            >
              <Icon sx={{ fontSize: { xs: '0.9rem', sm: '1.4rem' }, color: stat.color }} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                noWrap
                sx={{ fontWeight: 800, fontSize: { xs: '0.8rem', sm: '1.4rem' }, lineHeight: 1.1 }}
              >
                {stat.value.toLocaleString()}
              </Typography>
              <Typography
                noWrap
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.55rem', sm: '0.78rem' } }}
              >
                {stat.label}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Paper>
  )
}

export default StatsBar