import { Card, CardContent, Typography, Box, Avatar } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined'
import ForkRightIcon from '@mui/icons-material/ForkRight'
import type { GithubRepo } from '../../../types/github'
import styles from './RepoCard.module.css'

interface RepoCardProps {
  repo: GithubRepo
}

function RepoCard({ repo }: RepoCardProps) {
  return (
    <Card className={styles.card} variant="outlined">
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Avatar src={repo.owner.avatar_url} alt={repo.owner.login} sx={{ width: '1.5rem', height: '1.5rem' }} />
         <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700 }}>
            {repo.full_name}
        </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" className={styles.description}>
          {repo.description || 'No description provided'}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
      </CardContent>
    </Card>
  )
}

export default RepoCard