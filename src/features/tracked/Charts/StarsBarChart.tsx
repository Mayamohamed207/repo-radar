import { Box, Typography } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import type { GithubRepo } from '../../../types/github'
import { PALETTE, formatCompact } from './chartConstants'

interface ChartProps {
  repos: GithubRepo[]
}

function StarsBarChart({ repos }: ChartProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <BarChart
        dataset={repos.map((r) => ({
          fullName: r.full_name,
          stars: r.stargazers_count,
        }))}
        xAxis={[
          {
            scaleType: 'band',
            dataKey: 'fullName',
            valueFormatter: (val: string) => val.split('/')[1] || val,
            colorMap: { type: 'ordinal', colors: PALETTE },
            tickLabelStyle: { fontSize: 11 },
          },
        ]}
        yAxis={[
          {
            valueFormatter: (val: number | null) => (val != null ? formatCompact.format(val) : ''),
          },
        ]}
        series={[
          {
            dataKey: 'stars',
            valueFormatter: (val) => (val ? `${val.toLocaleString()} stars` : '0'),
          },
        ]}
        slots={{ legend: () => null }}
        height={280}
        margin={{ top: 10, bottom: 5, left: 15, right: 15 }}
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

export default StarsBarChart