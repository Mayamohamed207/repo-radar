import { useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store/store'
import { githubApi } from '../../../api/githubApi'
import { useTrackedRepoData } from '../../../hooks/useTrackedRepoData'
import TrackedCard from '../TrackedCard/TrackedCard'
import ChartsContainer from '../Charts/ChartsContainer'
import styles from './TrackedView.module.css'

function TrackedView() {
  const dispatch = useDispatch<AppDispatch>()
  const trackedRefs = useSelector((state: RootState) => state.tracked.repos)
  const liveRepos = useTrackedRepoData()
  const [refreshClicked, setRefreshClicked] = useState(false)

  const handleRefreshAll = () => {
    setRefreshClicked(true)
    trackedRefs.forEach((ref) => {
      dispatch(
        githubApi.endpoints.getRepoByFullName.initiate(ref.full_name, {
          subscribe: false,
          forceRefetch: true,
        })
      )
    })
    setTimeout(() => setRefreshClicked(false), 500)
  }

  if (trackedRefs.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.4rem', sm: '1.75rem' },
            letterSpacing: '-0.02em',
          }}
        >
          No repositories tracked yet
        </Typography>
        <Typography
          color="text.secondary"
          sx={{
            mt: 1,
            fontSize: { xs: '1rem', sm: '1.1rem' },
            maxWidth: '26rem',
            lineHeight: 1.5,
          }}
        >
          Search for GitHub repositories above and click "Track" to monitor them here.
        </Typography>
      </Box>
    )
  }

  return (
    <Box>
      <Box className={styles.header}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Radar Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Monitoring {trackedRefs.length} repositories
          </Typography>
        </Box>

        <Button
          size="small"
          variant="outlined"
          startIcon={<RefreshIcon fontSize="small" className={refreshClicked ? styles.spinning : ''} />}
          onClick={handleRefreshAll}
          disabled={refreshClicked}
          sx={{ textTransform: 'none' }}
        >
          Refresh All
        </Button>
      </Box>

      <ChartsContainer repos={liveRepos} />

      <Grid container spacing={2}>
        {trackedRefs.map((ref) => (
          <Grid key={ref.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TrackedCard repoRef={ref} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TrackedView