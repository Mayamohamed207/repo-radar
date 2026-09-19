import { Box } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import type { GithubRepo } from '../../types/github'
import { PALETTE, formatCompact } from './chartConstants'
import ChartBase from './ChartBase'

interface ChartProps {
  repos: GithubRepo[]
}

function ForksBarChart({ repos }: ChartProps) {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <BarChart
        layout="horizontal"
        dataset={repos.map((r) => ({ fullName: r.full_name, forks: r.forks_count }))}
        yAxis={[
          {
            scaleType: 'band',
            dataKey: 'fullName',
            valueFormatter: (val: string) => val.split('/')[1] || val,
            colorMap: { type: 'ordinal', colors: PALETTE },
            tickLabelStyle: { fontSize: 10 },
          },
        ]}
        xAxis={[{ tickNumber: 4, valueFormatter: (val: number | null) => (val != null ? formatCompact.format(val) : '') }]}
        series={[{ dataKey: 'forks', label: 'Forks', valueFormatter: (val) => (val ? `${val.toLocaleString()} forks` : '0') }]}
        slots={{ legend: () => null }}
        height={280}
        margin={{ left: 15, right: 15, top: 15, bottom: 5 }}
      />
      <ChartBase labels={repos.map((r) => r.full_name)} />
    </Box>
  )
}

export default ForksBarChart