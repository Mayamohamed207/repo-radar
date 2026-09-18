import { Grid, Typography, Skeleton, Box, Button, CircularProgress } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RepoCard from '../RepoCard/RepoCard'
import SortSelect from '../../../components/SortSelect/SortSelect'
import type { GithubRepo } from '../../../types/github'
import type { SearchSort } from '../../../api/githubApi'
import styles from './SearchResults.module.css'

type SearchStatus = 'loading' | 'success' | 'error'

const SORT_OPTIONS = [
  { value: '', label: 'Best match' },
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Recently updated' },
]

interface SearchResultsProps {
  status: SearchStatus
  results: GithubRepo[]
  hasMore: boolean
  loadingMore: boolean
  sort: SearchSort
  onSortChange: (sort: SearchSort) => void
  onLoadMore: () => void
  onBack: () => void
}

function SearchResults({
  status,
  results,
  hasMore,
  loadingMore,
  sort,
  onSortChange,
  onLoadMore,
  onBack,
}: SearchResultsProps) {
  return (
    <Box>
      <Box className={styles.header}>
        <Typography className={styles.title} sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.25rem' } }}>
          Search Results
        </Typography>
        <Box className={styles.controls}>
          <SortSelect value={sort} onChange={(val) => onSortChange(val as SearchSort)} options={SORT_OPTIONS} />
          <Button
            size="small"
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }} />}
            onClick={onBack}
            sx={{
              textTransform: 'none',
              fontSize: { xs: '0.65rem', sm: '0.85rem' },
              whiteSpace: 'nowrap',
              minWidth: 'unset',
              px: { xs: 0.75, sm: 2 },
              '& .MuiButton-startIcon': { mr: { xs: 0.25, sm: 1 } },
            }}
          >
            Back
          </Button>
        </Box>
      </Box>

      {status === 'loading' && (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height="9rem" />
            </Grid>
          ))}
        </Grid>
      )}

      {status === 'error' && (
        <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
          GitHub API rate limit reached (60 requests/hour).
        </Typography>
      )}

      {status === 'success' && results.length === 0 && (
        <Typography color="text.secondary" className={styles.emptyState}>
          No repositories found.
        </Typography>
      )}

      {status === 'success' && results.length > 0 && (
        <Grid container spacing={2}>
          {results.map((repo) => (
            <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <RepoCard repo={repo} />
            </Grid>
          ))}
        </Grid>
      )}

      {status === 'success' && hasMore && (
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