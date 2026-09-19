import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import SearchBar from './SearchBar'

const meta: Meta<typeof SearchBar> = {
  title: 'Features/SearchBar',
  component: SearchBar,
}

export default meta

type Story = StoryObj<typeof SearchBar>

export const Empty: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
}

export const WithText: Story = {
  args: {
    value: 'react',
    onChange: () => {},
  },
}

export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState('')
    return <SearchBar value={value} onChange={setValue} />
  },
}