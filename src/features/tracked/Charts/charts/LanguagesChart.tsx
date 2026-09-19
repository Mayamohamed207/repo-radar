import { Box } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import type { GithubRepo } from '../../../../types/github'
import { PALETTE } from './chartConstants'
import ChartBase from './ChartBase'

interface ChartProps {
  repos: GithubRepo[]
}

function LanguagesChart({ repos }: ChartProps) {
  const langCounts = repos.reduce((acc, r) => {
    const lang = r.language || 'Other'
    acc[lang] = (acc[lang] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const pieData = Object.entries(langCounts).map(([lang, count], index) => ({
    id: lang,
    value: count,
    label: lang,
    color: PALETTE[index % PALETTE.length],
  }))

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 280 }}>
        <PieChart
          series={[
            {
              data: pieData,
              innerRadius: 50,
              outerRadius: 105,
              paddingAngle: 3,
              cornerRadius: 5,
              valueFormatter: (item) => `${item.value} ${item.value === 1 ? 'repo' : 'repos'}`,
            },
          ]}
          slots={{ legend: () => null }}
          height={270}
          margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
        />
      </Box>
      <ChartBase labels={Object.keys(langCounts)} />
    </Box>
  )
}

export default LanguagesChart