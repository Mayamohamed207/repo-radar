import type { Meta, StoryObj } from '@storybook/react-vite'
import StatsBar from './StatsBar'
import { makeRepo } from '../../../test/makeRepo'

const meta: Meta<typeof StatsBar> = {
  title: 'Features/StatsBar',
  component: StatsBar,
}

export default meta

type Story = StoryObj<typeof StatsBar>

export const ManyRepos: Story = {
  args: {
    repos: [
      makeRepo({ id: 1, full_name: 'facebook/react', stargazers_count: 218000, open_issues_count: 1450, forks_count: 42300 }),
      makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900, open_issues_count: 220, forks_count: 8300 }),
      makeRepo({ id: 3, full_name: 'sveltejs/svelte', stargazers_count: 75000, open_issues_count: 380, forks_count: 3900 }),
      makeRepo({ id: 4, full_name: 'angular/angular', stargazers_count: 95000, open_issues_count: 1100, forks_count: 25000 }),
    ],
  },
}

export const SingleRepo: Story = {
  args: {
    repos: [makeRepo({ id: 1, full_name: 'facebook/react' })],
  },
}

export const NoRepos: Story = {
  args: { repos: [] },
}