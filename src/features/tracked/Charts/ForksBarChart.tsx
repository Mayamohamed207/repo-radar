import { Box, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import type { GithubRepo } from '../../../types/github'
import { PALETTE, formatCompact } from './chartConstants'

interface ChartProps {
  repos: GithubRepo[]
}

function ForksBarChart({ repos }: ChartProps) {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <BarChart
        layout="horizontal"
        dataset={repos.map((r) => ({
          fullName: r.full_name,
          forks: r.forks_count,
        }))}
        yAxis={[
          {
            scaleType: 'band',
            dataKey: 'fullName',
            valueFormatter: (val: string) => val.split('/')[1] || val,
            colorMap: { type: 'ordinal', colors: PALETTE },
            tickLabelStyle: { fontSize: 11 },
          },
        ]}
        xAxis={[
          {
            tickNumber: 20,
            valueFormatter: (val: number | null) => (val != null ? formatCompact.format(val) : ''),
          },
        ]}
        series={[
          {
            dataKey: 'forks',
            label: 'Forks',
            valueFormatter: (val) => (val ? `${val.toLocaleString()} forks` : '0'),
          },
        ]}
        slots={{ legend: () => null }}
        height={280}
        margin={{ left: 60, right: 15, top: 15, bottom: 5 }}
      />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, mt: 1 }}>
        {repos.map((r, i) => (
          <Box key={r.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: '0.6rem', height: '0.6rem', borderRadius: '0.15rem', bgcolor: PALETTE[i % PALETTE.length] }} />
            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
              {r.full_name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ForksBarChart