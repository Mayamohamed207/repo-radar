import { Grid, Typography, Skeleton } from '@mui/material'
import RepoCard from '../RepoCard/RepoCard'
import type { GithubRepo } from '../../../types/github'

interface SearchResultsProps {
  results: GithubRepo[] | undefined
  isFetching: boolean
  isError: boolean
  hasSearched: boolean
}

function SearchResults({ results, isFetching, isError, hasSearched }: SearchResultsProps) {
  if (!hasSearched) return null

  if (isFetching) {
    return (
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {[1, 2, 3].map((n) => (
          <Grid key={n} size={{ xs: 12, sm: 6, md: 4 }}>
            <Skeleton variant="rounded" height="9rem" />
          </Grid>
        ))}
      </Grid>
    )
  }

  if (isError) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Something went wrong while searching. Please try again.
      </Typography>
    )
  }

  if (!results || results.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        No repositories found.
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      {results.map((repo) => (
        <Grid key={repo.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <RepoCard repo={repo} />
        </Grid>
      ))}
    </Grid>
  )
}

export default SearchResults