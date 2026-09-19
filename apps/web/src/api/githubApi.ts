import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GithubRepo, GithubSearchResponse } from '../types/github'

export type SearchSort = '' | 'stars' | 'forks' | 'updated'

interface SearchReposArgs {
  searchTerm: string
  page: number
  sort: SearchSort
}

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    searchRepos: builder.query<GithubSearchResponse, SearchReposArgs>({
      query: ({ searchTerm, page, sort }) => {
        const sortParam = sort ? `&sort=${sort}&order=desc` : ''
        return `/search/repositories?q=${encodeURIComponent(searchTerm)}&page=${page}&per_page=30${sortParam}`
      },
    }),
    getRepoByFullName: builder.query<GithubRepo, string>({
      query: (fullName) => `/repos/${fullName}`,
    }),
  }),
})

export const { useSearchReposQuery, useGetRepoByFullNameQuery, useLazySearchReposQuery } = githubApi