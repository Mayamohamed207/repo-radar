import type { Meta, StoryObj } from '@storybook/react-vite'
import RepoCard from './RepoCard'
import type { GithubRepo } from '../../../types/github'

function makeRepo(overrides: Partial<GithubRepo> = {}): GithubRepo {
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

const meta: Meta<typeof RepoCard> = {
  title: 'Features/RepoCard',
  component: RepoCard,
}

export default meta

type Story = StoryObj<typeof RepoCard>

export const Default: Story = {
  args: { repo: makeRepo() },
}

export const NoDescription: Story = {
  args: { repo: makeRepo({ id: 999002, description: null }) },
}

export const LongDescription: Story = {
  args: {
    repo: makeRepo({
      id: 999003,
      description:
        'This is a much longer description than usual, the kind some maintainers write when they want to explain not just what the project does but also why it exists, who it is for, and what makes it different from every other library that solves a similar problem.',
    }),
  },
}

export const LongRepoName: Story = {
  args: {
    repo: makeRepo({
      id: 999004,
      full_name: 'some-very-long-organization-name/an-extremely-descriptive-repository-name',
    }),
  },
}