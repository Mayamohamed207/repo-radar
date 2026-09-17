import { Grid, Typography, Skeleton, Box, Button, CircularProgress } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RepoCard from '../RepoCard/RepoCard'
import type { GithubRepo } from '../../../types/github'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  results: GithubRepo[]
  isFetching: boolean
  isError: boolean
  hasSearched: boolean
  hasMore: boolean
  loadingMore: boolean
  onLoadMore: () => void
  onBack: () => void
}

function SearchResults({
  results,
  isFetching,
  isError,
  hasSearched,
  hasMore,
  loadingMore,
  onLoadMore,
  onBack,
}: SearchResultsProps) {
  if (!hasSearched) return null

  const isInitialLoad = isFetching && results.length === 0

  return (
    <Box>
      <Box className={styles.header}>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
          Search Results
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ textTransform: 'none', fontSize: { xs: '0.75rem', sm: '0.85rem' }, flexShrink: 0 }}
        >
          Back to Tracked Repos
        </Button>
      </Box>

      {isInitialLoad && (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height="9rem" />
            </Grid>
          ))}
        </Grid>
      )}

      {isError && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          GitHub API rate limit reached (60 requests/hour).
        </Typography>
      )}

      {!isInitialLoad && !isError && results.length === 0 && (
        <Typography color="text.secondary" className={styles.emptyState}>
          No repositories found.
        </Typography>
      )}

      <Grid container spacing={2}>
        {results.map((repo) => (
          <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RepoCard repo={repo} />
          </Grid>
        ))}
      </Grid>

      {!isInitialLoad && hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant={loadingMore ? 'text' : 'outlined'}
            onClick={onLoadMore}
            disabled={loadingMore}
            startIcon={loadingMore ? <CircularProgress size={16} /> : null}
            sx={{ textTransform: 'none', minWidth: '9rem' }}
          >
            {loadingMore ? 'Loading more...' : 'Load more'}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default SearchResults