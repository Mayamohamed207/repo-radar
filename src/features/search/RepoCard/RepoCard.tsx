import { Card, CardContent, Typography, Box, Avatar, Button } from '@mui/material'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store/store'
import { trackRepo, untrackRepo } from '../../tracked/trackedRepos'
import type { GithubRepo } from '../../../types/github'
import RepoStatsRow from '../../../components/RepoStatsRow/RepoStatsRow'
import styles from './RepoCard.module.css'

interface RepoCardProps {
  repo: GithubRepo
}

function RepoCard({ repo }: RepoCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const isTracked = useSelector((state: RootState) => state.tracked.repos.some((r) => r.id === repo.id))

  const handleToggleTrack = () => {
    if (isTracked) {
      dispatch(untrackRepo(repo.id))
    } else {
      dispatch(trackRepo({ id: repo.id, full_name: repo.full_name }))
    }
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
        </Box>

        <Typography variant="body2" color="text.secondary" className={styles.description}>
          {repo.description || 'No description provided'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
          <RepoStatsRow stars={repo.stargazers_count} openIssues={repo.open_issues_count} forks={repo.forks_count} />

          <Button
            size="small"
            variant={isTracked ? 'outlined' : 'contained'}
            color={isTracked ? 'error' : 'primary'}
            startIcon={isTracked ? <BookmarkRemoveIcon /> : <BookmarkAddOutlinedIcon />}
            onClick={handleToggleTrack}
            sx={{ textTransform: 'none', borderRadius: '0.5rem' }}
          >
            {isTracked ? 'Untrack' : 'Track'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default RepoCard