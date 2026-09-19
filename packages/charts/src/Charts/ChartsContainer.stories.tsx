import type { Meta, StoryObj } from '@storybook/react-vite'
import ChartsContainer from './ChartsContainer'
import { makeRepo } from '../../../../apps/web/src/test/makeRepo'

const meta: Meta<typeof ChartsContainer> = {
  title: 'Features/ChartsContainer',
  component: ChartsContainer,
}

export default meta

type Story = StoryObj<typeof ChartsContainer>

export const FewRepos: Story = {
  args: {
    repos: [
      makeRepo({ id: 1, full_name: 'facebook/react', stargazers_count: 218000, open_issues_count: 1450, forks_count: 42300, language: 'JavaScript' }),
      makeRepo({ id: 2, full_name: 'vuejs/vue', stargazers_count: 45900, open_issues_count: 220, forks_count: 8300, language: 'TypeScript' }),
      makeRepo({ id: 3, full_name: 'sveltejs/svelte', stargazers_count: 75000, open_issues_count: 380, forks_count: 3900, language: 'TypeScript' }),
    ],
  },
}

export const SingleRepo: Story = {
  args: {
    repos: [makeRepo()],
  },
}