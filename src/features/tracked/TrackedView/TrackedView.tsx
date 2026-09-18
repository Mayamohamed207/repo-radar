import { useMemo, useState } from 'react'
import { Box, Typography, Button, Grid } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store/store'
import { githubApi } from '../../../api/githubApi'
import { useTrackedRepoData } from '../../../hooks/useTrackedRepoData'
import TrackedCard from '../TrackedCard/TrackedCard'
import ChartsContainer from '../Charts/ChartsContainer'
import SortSelect from '../../../components/SortSelect/SortSelect'
import type { GithubRepo } from '../../../types/github'
import styles from './TrackedView.module.css'

type TrackedSort = 'stars' | 'forks' | 'issues' | 'updated'

const SORT_OPTIONS = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'issues', label: 'Open issues' },
  { value: 'updated', label: 'Recently updated' },
]

function getSortValue(repo: GithubRepo, sort: TrackedSort): number {
  switch (sort) {
    case 'stars':
      return repo.stargazers_count
    case 'forks':
      return repo.forks_count
    case 'issues':
      return repo.open_issues_count
    case 'updated':
      return new Date(repo.pushed_at).getTime()
  }
}

function TrackedView() {
  const dispatch = useDispatch<AppDispatch>()
  const trackedRefs = useSelector((state: RootState) => state.tracked.repos)
  const liveRepos = useTrackedRepoData()
  const [refreshClicked, setRefreshClicked] = useState(false)
  const [sort, setSort] = useState<TrackedSort>('stars')

  const liveDataById = useMemo(() => {
    const map = new Map<number, GithubRepo>()
    liveRepos.forEach((repo) => map.set(repo.id, repo))
    return map
  }, [liveRepos])

  const sortedRefs = useMemo(() => {
    return [...trackedRefs].sort((a, b) => {
      const repoA = liveDataById.get(a.id)
      const repoB = liveDataById.get(b.id)
      if (!repoA || !repoB) return 0
      return getSortValue(repoB, sort) - getSortValue(repoA, sort)
    })
  }, [trackedRefs, liveDataById, sort])

  const sortedLiveRepos = useMemo(() => {
    return [...liveRepos].sort((a, b) => getSortValue(b, sort) - getSortValue(a, sort))
  }, [liveRepos, sort])

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
        <Box className={styles.titleBlock}>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: '0.95rem', sm: '1.5rem' } }}>
            Radar Dashboard
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.65rem', sm: '0.875rem' }, display: { xs: 'none', sm: 'block' } }}
          >
            Monitoring {trackedRefs.length} repositories
          </Typography>
        </Box>

        <Box className={styles.controls}>
          <SortSelect value={sort} onChange={(val) => setSort(val as TrackedSort)} options={SORT_OPTIONS} />
          <Button
            size="small"
            variant="outlined"
            startIcon={<RefreshIcon sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }} className={refreshClicked ? styles.spinning : ''} />}
            onClick={handleRefreshAll}
            disabled={refreshClicked}
            sx={{
              textTransform: 'none',
              fontSize: { xs: '0.65rem', sm: '0.85rem' },
              whiteSpace: 'nowrap',
              minWidth: 'unset',
              px: { xs: 0.75, sm: 2 },
              '& .MuiButton-startIcon': { mr: { xs: 0.25, sm: 1 } },
            }}
          >
            Refresh All
          </Button>
        </Box>
      </Box>

      <ChartsContainer repos={sortedLiveRepos} />

      <Grid container spacing={2}>
        {sortedRefs.map((ref) => (
          <Grid key={ref.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <TrackedCard repoRef={ref} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default TrackedView