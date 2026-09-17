import { Card, CardContent, Typography, Box, Avatar, IconButton, Button, Skeleton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store/store'
import { untrackRepo } from '../trackedRepos'
import { useGetRepoByFullNameQuery } from '../../../api/githubApi'
import type { TrackedRepoRef } from '../../../types/github'
import RepoStatsRow from '../../../components/RepoStatsRow/RepoStatsRow'
import styles from './TrackedCard.module.css'

interface TrackedCardProps {
  repoRef: TrackedRepoRef
}

function TrackedCard({ repoRef }: TrackedCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { data: repo, isLoading, isFetching, isError, refetch } =
    useGetRepoByFullNameQuery(repoRef.full_name)

  const commitDate = repo?.pushed_at ? new Date(repo.pushed_at).toLocaleDateString() : 'N/A'

  return (
    <Card className={styles.card} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            {repo ? (
              <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} sx={{ width: '1.5rem', height: '1.5rem' }} />
            ) : (
              <Skeleton variant="circular" width="1.5rem" height="1.5rem" />
            )}
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
              {repoRef.full_name}
            </Typography>
          </Box>
          <IconButton size="small" onClick={() => refetch()} disabled={isFetching || isLoading}>
            <RefreshIcon fontSize="small" className={isFetching ? styles.spinning : ''} />
          </IconButton>
        </Box>

        {isError && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mb: 0.5 }}>
            {repo ? 'Failed to refresh latest stats' : 'Failed to load repository'}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" className={styles.description}>
          {repo ? repo.description || 'No description provided' : <Skeleton variant="text" />}
        </Typography>

        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'var(--color-text-secondary)' }}>
          Last commit: {repo?.pushed_at ? commitDate : isLoading ? 'Loading...' : 'N/A'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
          {repo ? (
            <RepoStatsRow stars={repo.stargazers_count} openIssues={repo.open_issues_count} forks={repo.forks_count} />
          ) : (
            <Skeleton variant="text" width="6rem" />
          )}

          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<BookmarkRemoveIcon />}
            onClick={() => dispatch(untrackRepo(repoRef.id))}
            sx={{ textTransform: 'none' }}
          >
            Untrack
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TrackedCard
