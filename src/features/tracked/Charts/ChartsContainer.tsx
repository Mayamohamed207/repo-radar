import { useState } from 'react'
import { Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
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

function ChartsContainer({ repos }: ChartsContainerProps) {
  const [metric, setMetric] = useState<MetricType>('stars')

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

          <ToggleButtonGroup
            size="small"
            value={metric}
            exclusive
            onChange={(_, val) => val && setMetric(val)}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              display: 'flex',
            }}
          >
            <ToggleButton
              value="stars"
              sx={{
                flex: { xs: 1, sm: 'initial' },
                px: { xs: 0.5, sm: 1.5 },
                py: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                textTransform: 'none',
              }}
            >
              <BarChartIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, mr: { xs: 0.25, sm: 0.5 } }} />
              Stars
            </ToggleButton>
            <ToggleButton
              value="forks"
              sx={{
                flex: { xs: 1, sm: 'initial' },
                px: { xs: 0.5, sm: 1.5 },
                py: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                textTransform: 'none',
              }}
            >
              <ForkRightIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, mr: { xs: 0.25, sm: 0.5 } }} />
              Forks
            </ToggleButton>
            <ToggleButton
              value="issues"
              sx={{
                flex: { xs: 1, sm: 'initial' },
                px: { xs: 0.5, sm: 1.5 },
                py: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                textTransform: 'none',
              }}
            >
              <DonutLargeIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, mr: { xs: 0.25, sm: 0.5 } }} />
              Issues
            </ToggleButton>
            <ToggleButton
              value="languages"
              sx={{
                flex: { xs: 1, sm: 'initial' },
                px: { xs: 0.5, sm: 1.5 },
                py: 0.5,
                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                textTransform: 'none',
              }}
            >
              <CodeIcon sx={{ fontSize: { xs: '1rem', sm: '1.2rem' }, mr: { xs: 0.25, sm: 0.5 } }} />
              Languages
            </ToggleButton>
          </ToggleButtonGroup>
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