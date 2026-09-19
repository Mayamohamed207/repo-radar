import { Box } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import type { GithubRepo } from '../../types/github'
import { PALETTE } from './chartConstants'
import ChartBase from './ChartBase'

interface ChartProps {
  repos: GithubRepo[]
}

function IssuesDonutChart({ repos }: ChartProps) {
  const pieData = repos.map((r, index) => ({
    id: r.id,
    value: r.open_issues_count,
    label: r.full_name,
    color: PALETTE[index % PALETTE.length],
  }))

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 280 }}>
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 55,
              outerRadius: 105,
              paddingAngle: 3,
              cornerRadius: 5,
              valueFormatter: (item) => `${item.value.toLocaleString()} open issues`,
            },
          ]}
          slots={{ legend: () => null }}
          height={270}
          margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
        />
      </Box>
      <ChartBase labels={repos.map((r) => r.full_name)} />
    </Box>
  )
}

export default IssuesDonutChart