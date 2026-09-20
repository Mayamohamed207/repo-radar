import type { MouseEvent } from 'react'
import { Card, CardContent, Typography, Box, Avatar, IconButton, Button, Skeleton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store/store'
import { untrackRepo } from '../trackedRepos'
import { useGetRepoByFullNameQuery } from '../../../api/githubApi'
import { getErrorStatus } from '../../../api/getErrorStatus'
import type { TrackedRepoRef } from '../../../types/github'
import { RepoStatsRow } from "@repo-radar/ui";
import { useToast } from '../../../providers/useToast'
import styles from './TrackedCard.module.css'

interface TrackedCardProps {
  repoRef: TrackedRepoRef
}

function getErrorMessage(error: unknown, hasRepo: boolean): string {
  const status = getErrorStatus(error)

  if (status === 404) {
    return 'This repository no longer exists on GitHub'
  }
  if (status === 403) {
    return 'GitHub rate limit reached - try again shortly'
  }
  return hasRepo ? 'Failed to refresh latest stats' : 'Failed to load repository'
}

function TrackedCard({ repoRef }: TrackedCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { showToast } = useToast()
  const { data: repo, isLoading, isFetching, isError, error, refetch } =
    useGetRepoByFullNameQuery(repoRef.full_name)

  const commitDate = repo?.pushed_at ? new Date(repo.pushed_at).toLocaleDateString() : 'N/A'
  const description = repo ? repo.description || 'No description provided' : 'No data available'

  const handleOpenRepo = () => {
    if (repo) window.open(repo.html_url, '_blank', 'noopener,noreferrer')
  }

  const handleRefresh = (event: MouseEvent) => {
    event.stopPropagation()
    refetch()
  }

  const handleUntrack = (event: MouseEvent) => {
    event.stopPropagation()
    dispatch(untrackRepo(repoRef.id))
    showToast(`${repoRef.full_name} removed from tracked repos`, 'info')
  }

  return (
    <Card
      className={styles.card}
      variant="outlined"
      onClick={handleOpenRepo}
      sx={{ cursor: repo ? 'pointer' : 'default' }}
    >
      <CardContent className={repo ? styles.content : ''}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            {isLoading ? (
              <Skeleton variant="circular" width="1.5rem" height="1.5rem" />
            ) : (
              <Avatar src={repo?.owner.avatar_url} alt={repo?.owner.login} sx={{ width: '1.5rem', height: '1.5rem' }} />
            )}
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
              {repoRef.full_name}
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleRefresh} disabled={isFetching || isLoading}>
            <RefreshIcon fontSize="small" className={isFetching ? styles.spinning : ''} />
          </IconButton>
        </Box>

        {isError && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mb: 0.5 }}>
            {getErrorMessage(error, Boolean(repo))}
          </Typography>
        )}

        <Typography variant="body2" color="text.secondary" className={styles.description}>
          {isLoading ? <Skeleton variant="text" /> : description}
        </Typography>

        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'var(--color-text-secondary)' }}>
          Last commit: {repo?.pushed_at ? commitDate : isLoading ? 'Loading...' : 'N/A'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
          {isLoading && <Skeleton variant="text" width="6rem" />}
          {repo && (
            <RepoStatsRow stars={repo.stargazers_count} openIssues={repo.open_issues_count} forks={repo.forks_count} />
          )}

          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<BookmarkRemoveIcon />}
            onClick={handleUntrack}
            sx={{ textTransform: 'none', ml: 'auto' }}
          >
            Untrack
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TrackedCard