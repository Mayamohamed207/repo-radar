import { Grid, Typography, Skeleton, Box, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RepoCard from '../RepoCard/RepoCard'
import type { GithubRepo } from '../../../types/github'

interface SearchResultsProps {
  results: GithubRepo[] | undefined
  isFetching: boolean
  isError: boolean
  hasSearched: boolean
  onBack: () => void
}

function SearchResults({ results, isFetching, isError, hasSearched, onBack }: SearchResultsProps) {
  if (!hasSearched) return null

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Search Results
        </Typography>
        <Button
          size="small"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ textTransform: 'none' }}
        >
          Back to Tracked Repos
        </Button>
      </Box>

      {isFetching && (
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
          GitHub API rate limit reached (60 requests/hour). Please wait a moment or try again later.
        </Typography>
      )}

      {!isFetching && (!results || results.length === 0) && (
        <Typography color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          No repositories found.
        </Typography>
      )}

      <Grid container spacing={2}>
        {results?.map((repo) => (
          <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <RepoCard repo={repo} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default SearchResults