import { Card, CardContent, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import type { GithubRepo } from '../../../types/github'

const PALETTE = [
  'var(--color-primary)',
  'var(--color-star)',
  'var(--color-success)',
  'var(--color-error)',
]

const formatCompact = new Intl.NumberFormat('en', { notation: 'compact' })

function StarsChart({ repos }: { repos: GithubRepo[] }) {
  if (repos.length === 0) return null

  return (
    <Card variant="outlined" sx={{ mb: 3, overflow: 'hidden' }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Stars Comparison
        </Typography>
        <BarChart
          dataset={repos.map((r) => ({ name: r.full_name, stars: r.stargazers_count }))}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'name',
              colorMap: { type: 'ordinal', colors: PALETTE },
              tickLabelStyle: { fontSize: 11, angle: -15, textAnchor: 'end' },
            },
          ]}
          yAxis={[
            {
              valueFormatter: (val: number | null) => (val != null ? formatCompact.format(val) : ''),
            },
          ]}
          series={[{ dataKey: 'stars', label: 'Stars' }]}
          height={280}
          margin={{ bottom: 70, left: 55, right: 20 }}
        />
      </CardContent>
    </Card>
  )
}

export default StarsChart