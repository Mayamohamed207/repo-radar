import type { GithubRepo } from '../types/github'

export function makeRepo(overrides: Partial<GithubRepo> = {}): GithubRepo {
  return {
    id: 999001,
    name: 'react',
    full_name: 'facebook/react',
    description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
    html_url: 'https://github.com/facebook/react',
    stargazers_count: 218000,
    open_issues_count: 1450,
    forks_count: 42300,
    language: 'JavaScript',
    owner: { login: 'facebook', avatar_url: 'https://github.com/facebook.png' },
    pushed_at: '2026-09-01T12:00:00Z',
    ...overrides,
  }
}