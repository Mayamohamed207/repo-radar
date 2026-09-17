import { Card, CardContent, Typography, Box, Avatar, Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../../../store/store'
import { trackRepo, untrackRepo } from '../../tracked/trackedRepos'
import type { GithubRepo } from '../../../types/github'
import styles from './RepoCard.module.css'

interface RepoCardProps {
  repo: GithubRepo
}

function RepoCard({ repo }: RepoCardProps) {
  const dispatch = useDispatch<AppDispatch>()
  const trackedRepos = useSelector((state: RootState) => state.tracked.repos)
  const isTracked = trackedRepos.some((r) => r.id === repo.id)

  const handleToggleTrack = () => {
    if (isTracked) {
      dispatch(untrackRepo(repo.id))
    } else {
      dispatch(trackRepo(repo))
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
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <StarIcon sx={{ fontSize: '1.1rem', color: 'var(--color-star)' }} />
              <Typography variant="body2">{repo.stargazers_count.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ReportProblemOutlinedIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
              <Typography variant="body2">{repo.open_issues_count.toLocaleString()}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ForkRightIcon sx={{ fontSize: '1.1rem', color: 'text.secondary' }} />
              <Typography variant="body2">{repo.forks_count.toLocaleString()}</Typography>
            </Box>
          </Box>

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