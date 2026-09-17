import { Box, Typography, Button, Grid, Skeleton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RepoCard from '../RepoCard/RepoCard'
import { useSearchReposQuery } from '../../../api/githubApi'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  query: string
  onClear: () => void
}

function SearchResults({ query, onClear }: SearchResultsProps) {
  const debounced = useDebouncedValue(query, 500)
  const { data, isFetching, isError } = useSearchReposQuery(debounced, {
    skip: debounced.trim() === '',
  })

  return (
    <Box>
      <Box className={styles.header}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Results for "{query}"
        </Typography>
        <Button size="small" startIcon={<ArrowBackIcon />} onClick={onClear}>
          Back to Radar
        </Button>
      </Box>

      {isFetching && (
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <Skeleton variant="rounded" height="10rem" />
            </Grid>
          ))}
        </Grid>
      )}

      {isError && (
        <Typography color="error" sx={{ textAlign: 'center', mt: 4 }}>
          Could not load repositories. You may have hit the GitHub rate limit.
        </Typography>
      )}

      {!isFetching && data?.items.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No repositories found matching "{query}".
        </Typography>
      )}

      <Grid container spacing={2}>
        {data?.items.map((repo) => (
          <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RepoCard repo={repo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SearchResults