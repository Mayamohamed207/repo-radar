import { useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store/store'
import { githubApi } from '../../../api/githubApi'
import TrackedCard from '../TrackedCard/TrackedCard'
import styles from './TrackedView.module.css'

function TrackedView() {
  const dispatch = useDispatch<AppDispatch>()
  const trackedRepos = useSelector((state: RootState) => state.tracked.repos)
  const [refreshing, setRefreshing] = useState(false)

  const handleRefreshAll = () => {
    setRefreshing(true)
    trackedRepos.forEach((repo) => {
      dispatch(
        githubApi.endpoints.getRepoByFullName.initiate(repo.full_name, {
          subscribe: false,
          forceRefetch: true,
        })
      )
    })
    setTimeout(() => setRefreshing(false), 700)
  }

  if (trackedRepos.length === 0) {
    return (
      <Box className={styles.empty}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          No repositories tracked yet
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
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
            Monitoring {trackedRepos.length} repositories
          </Typography>
        </Box>

        <Button
          size="small"
          variant="outlined"
          startIcon={<RefreshIcon fontSize="small" className={refreshing ? styles.spinning : ''} />}
          onClick={handleRefreshAll}
          disabled={refreshing}
          sx={{ textTransform: 'none' }}
        >
          Refresh All
        </Button>
      </Box>

      <Grid container spacing={2}>
        {trackedRepos.map((repo) => (
          <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TrackedCard initialRepo={repo} isRefreshingAll={refreshing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TrackedView