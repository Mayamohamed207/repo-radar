import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GithubRepo, GithubSearchResponse } from '../types/github'

interface SearchReposArgs {
  searchTerm: string
  page: number
}

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    searchRepos: builder.query<GithubSearchResponse, SearchReposArgs>({
      query: ({ searchTerm, page }) =>
        `/search/repositories?q=${encodeURIComponent(searchTerm)}&page=${page}&per_page=30`,
    }),
    getRepoByFullName: builder.query<GithubRepo, string>({
      query: (fullName) => `/repos/${fullName}`,
    }),
  }),
})

export const { useSearchReposQuery, useGetRepoByFullNameQuery, useLazySearchReposQuery } = githubApi