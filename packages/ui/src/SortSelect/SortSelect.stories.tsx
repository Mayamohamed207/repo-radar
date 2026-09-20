import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'
import SortSelect from './SortSelect'

const meta: Meta<typeof SortSelect> = {
  title: 'Components/SortSelect',
  component: SortSelect,
  args: {
    value: 'stars',
    options: [
      { value: 'stars', label: 'Stars' },
      { value: 'forks', label: 'Forks' },
      { value: 'issues', label: 'Open issues' },
      { value: 'updated', label: 'Recently updated' },
    ],
    onChange: () => {},
  },
  argTypes: {
    value: {
      control: 'select',
      options: ['stars', 'forks', 'issues', 'updated'],
    },
    options: { control: false },
    onChange: { control: false },
  },
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return <SortSelect {...args} onChange={(value) => updateArgs({ value })} />
  },
}

export default meta

type Story = StoryObj<typeof SortSelect>

export const Default: Story = {}