import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GithubRepo, GithubSearchResponse } from '../types/github'

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
  endpoints: (builder) => ({
    searchRepos: builder.query<GithubSearchResponse, string>({
      query: (searchTerm) => `/search/repositories?q=${encodeURIComponent(searchTerm)}`,
    }),
    getRepoByFullName: builder.query<GithubRepo, string>({
      query: (fullName) => `/repos/${fullName}`,
    }),
  }),
})

export const { useSearchReposQuery, useGetRepoByFullNameQuery, useLazySearchReposQuery } = githubApi