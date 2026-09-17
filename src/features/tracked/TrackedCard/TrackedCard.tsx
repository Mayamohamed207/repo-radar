import { useState } from 'react'
import { Card, CardContent, Typography, Box, Avatar, IconButton, Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../../store/store'
import { untrackRepo } from '../trackedRepos'
import { useGetRepoByFullNameQuery } from '../../../api/githubApi'
import type { GithubRepo } from '../../../types/github'
import RepoStatsRow from '../../../components/RepoStatsRow/RepoStatsRow'
import styles from './TrackedCard.module.css'

interface TrackedCardProps {
  initialRepo: GithubRepo
  isRefreshingAll?: boolean
}

function TrackedCard({ initialRepo, isRefreshingAll }: TrackedCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { data, isError, refetch } = useGetRepoByFullNameQuery(initialRepo.full_name)
  const [spinning, setSpinning] = useState(false)

  const repo = data || initialRepo
  const isSpinning = spinning || isRefreshingAll
  const commitDate = repo.pushed_at ? new Date(repo.pushed_at).toLocaleDateString() : 'N/A'

  const handleRefresh = async () => {
    setSpinning(true)
    await refetch()
    setTimeout(() => setSpinning(false), 700)
  }

  return (
    <Card className={styles.card} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} sx={{ width: '1.5rem', height: '1.5rem' }} />
            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
              {repo.full_name}
            </Typography>
          </Box>
          <IconButton size="small" onClick={handleRefresh} disabled={isSpinning}>
            <RefreshIcon fontSize="small" className={isSpinning ? styles.spinning : ''} />
          </IconButton>
        </Box>

        {isError && (
          <Typography variant="caption" color="error" sx={{ display: 'block', mb: 0.5 }}>
            Failed to refresh latest stats
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary" className={styles.description}>
          {repo.description || 'No description provided'}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          Last commit: {commitDate}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
          <RepoStatsRow stars={repo.stargazers_count} openIssues={repo.open_issues_count} forks={repo.forks_count} />

          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<BookmarkRemoveIcon />}
            onClick={() => dispatch(untrackRepo(repo.id))}
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