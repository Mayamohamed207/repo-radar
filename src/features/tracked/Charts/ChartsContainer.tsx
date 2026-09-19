import { useEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import CodeIcon from '@mui/icons-material/Code'
import type { GithubRepo } from '../../../types/github'
import StarsBarChart from './StarsBarChart'
import ForksBarChart from './ForksBarChart'
import IssuesDonutChart from './IssuesDonutChart'
import LanguagesChart from './LanguagesChart'

interface ChartsContainerProps {
  repos: GithubRepo[]
}

type MetricType = 'stars' | 'forks' | 'issues' | 'languages'

const METRICS: { value: MetricType; label: string; icon: typeof BarChartIcon }[] = [
  { value: 'stars', label: 'Stars', icon: BarChartIcon },
  { value: 'forks', label: 'Forks', icon: ForkRightIcon },
  { value: 'issues', label: 'Issues', icon: DonutLargeIcon },
  { value: 'languages', label: 'Languages', icon: CodeIcon },
]

function ChartsContainer({ repos }: ChartsContainerProps) {
  const [metric, setMetric] = useState<MetricType>('stars')
  const trackRef = useRef<HTMLDivElement>(null)
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const activeButton = track.querySelector<HTMLButtonElement>(`[data-value="${metric}"]`)
    if (!activeButton) return
    setIndicator({ left: activeButton.offsetLeft, width: activeButton.offsetWidth })
  }, [metric, repos])

  if (repos.length === 0) return null

  const getTitle = () => {
    switch (metric) {
      case 'stars':
        return 'Stars Comparison'
      case 'forks':
        return 'Forks Leaderboard'
      case 'issues':
        return 'Open Issues Distribution'
      case 'languages':
        return 'Languages Breakdown'
    }
  }

  return (
    <Card variant="outlined" sx={{ mb: 3, overflow: 'hidden' }}>
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {getTitle()}
          </Typography>

          <Box
            ref={trackRef}
            sx={{
              position: 'relative',
              display: 'flex',
              gap: 0.25,
              width: { xs: '100%', sm: 'auto' },
              bgcolor: 'var(--color-bg)',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '0.65rem',
              p: 0.25,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0.25,
                bottom: 0.25,
                left: `${indicator.left}px`,
                width: `${indicator.width}px`,
                bgcolor: 'background.paper',
                borderRadius: '0.5rem',
                boxShadow: '0 0.1rem 0.4rem rgba(0, 0, 0, 0.12)',
                transition: 'left 0.35s cubic-bezier(0.22, 1, 0.36, 1), width 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
            />
            {METRICS.map((item) => {
              const Icon = item.icon
              const isActive = item.value === metric
              return (
                <Box
                  key={item.value}
                  component="button"
                  data-value={item.value}
                  onClick={() => setMetric(item.value)}
                  sx={{
                    position: 'relative',
                    zIndex: 1,
                    flex: { xs: 1, sm: 'initial' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 0.5,
                    border: 'none',
                    bgcolor: 'transparent',
                    borderRadius: '0.5rem',
                    px: { xs: 0.5, sm: 1.5 },
                    py: 0.7,
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    fontWeight: 600,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    cursor: 'pointer',
                    transition: 'color 0.25s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  {item.label}
                </Box>
              )
            })}
          </Box>
        </Box>

        {metric === 'stars' && <StarsBarChart repos={repos} />}
        {metric === 'forks' && <ForksBarChart repos={repos} />}
        {metric === 'issues' && <IssuesDonutChart repos={repos} />}
        {metric === 'languages' && <LanguagesChart repos={repos} />}
      </CardContent>
    </Card>
  )
}

export default ChartsContainer