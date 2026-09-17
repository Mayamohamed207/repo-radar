import type { Meta, StoryObj } from '@storybook/react-vite'
import RepoStatsRow from './RepoStatsRow'

const meta: Meta<typeof RepoStatsRow> = {
  title: 'Components/RepoStatsRow',
  component: RepoStatsRow,
}

export default meta

type Story = StoryObj<typeof RepoStatsRow>

export const Default: Story = {
  args: {
    stars: 4200,
    openIssues: 31,
    forks: 812,
  },
}

export const PopularRepo: Story = {
  args: {
    stars: 218000,
    openIssues: 1450,
    forks: 42300,
  },
}

export const NewRepo: Story = {
  args: {
    stars: 0,
    openIssues: 0,
    forks: 0,
  },
}