import { Grid, Typography, Skeleton, Box, Button, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RepoCard from '../RepoCard/RepoCard'
import { SortSelect } from "@repo-radar/ui";
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
  errorMessage: string | null
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
  errorMessage,
  results,
  hasMore,
  loadingMore,
  sort,
  onSortChange,
  onLoadMore,
  onBack,
}: SearchResultsProps) {
  const loadMoreLabel = loadingMore ? 'Loading more...' : errorMessage ? 'Try again' : 'Load more'

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
            Back To Radar
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
          {errorMessage}
        </Typography>
      )}

      {status === 'success' && results.length === 0 && (
        <Typography color="text.secondary" className={styles.emptyState}>
          No repositories found.
        </Typography>
      )}

      {status === 'success' && results.length > 0 && (
        <Grid container spacing={2}>
          {results.map((repo, index) => (
            <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, delay: (index % 30) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <RepoCard repo={repo} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {status === 'success' && errorMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          {errorMessage}
        </Typography>
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
            {loadMoreLabel}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default SearchResults