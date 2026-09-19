import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
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
import styles from './ChartsContainer.module.css'

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

  const indicatorStyle = {
    '--indicator-left': `${indicator.left}px`,
    '--indicator-width': `${indicator.width}px`,
  } as CSSProperties

  return (
    <Card variant="outlined" className={styles.card}>
      <CardContent className={styles.content}>
        <Box className={styles.header}>
          <Typography variant="subtitle1" className={styles.title}>
            {getTitle()}
          </Typography>

          <Box ref={trackRef} className={styles.tabsTrack} style={indicatorStyle}>
            <Box className={styles.indicator} />
            {METRICS.map((item) => {
              const Icon = item.icon
              const isActive = item.value === metric
              return (
                <Box
                  key={item.value}
                  component="button"
                  data-value={item.value}
                  onClick={() => setMetric(item.value)}
                  className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ''}`}
                >
                  <Icon className={styles.tabIcon} />
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