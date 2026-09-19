import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box } from '@mui/material'
import RepoCard from './RepoCard'
import { makeRepo } from '../../../test/makeRepo'

const meta: Meta<typeof RepoCard> = {
  title: 'Features/RepoCard',
  component: RepoCard,
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: '24rem' }}>
        <Story />
      </Box>
    ),
  ],
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
