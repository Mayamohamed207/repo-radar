import { Box } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import type { GithubRepo } from '../../types/github'
import { PALETTE, formatCompact } from './chartConstants'
import ChartBase from './ChartBase'

interface ChartProps {
  repos: GithubRepo[]
}

function StarsBarChart({ repos }: ChartProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        dataset={repos.map((r) => ({ fullName: r.full_name, stars: r.stargazers_count }))}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'fullName',
            valueFormatter: (val: string) => val.split('/')[1] || val,
            colorMap: { type: 'ordinal', colors: PALETTE },
            tickLabelStyle: { fontSize: 11 },
          },
        ]}
        yAxis={[{ valueFormatter: (val: number | null) => (val != null ? formatCompact.format(val) : '') }]}
        series={[{ dataKey: 'stars', valueFormatter: (val) => (val ? `${val.toLocaleString()} stars` : '0') }]}
        slots={{ legend: () => null }}
        height={280}
        margin={{ top: 10, bottom: 5, left: 15, right: 15 }}
      />
      <ChartBase labels={repos.map((r) => r.full_name)} />
    </Box>
  )
}

export default StarsBarChart