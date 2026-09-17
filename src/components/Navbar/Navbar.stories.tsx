import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import Navbar from './Navbar'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Desktop: Story = {
  args: {
    searchInput: '',
    onSearchChange: () => {},
  },
  globals: {
    viewport: { value: 'ipad', isRotated: false },
  },
}

export const Mobile: Story = {
  args: {
    searchInput: '',
    onSearchChange: () => {},
  },
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}

export const Interactive: Story = {
  render: function Render() {
    const [searchInput, setSearchInput] = useState('')
    return <Navbar searchInput={searchInput} onSearchChange={setSearchInput} />
  },
}