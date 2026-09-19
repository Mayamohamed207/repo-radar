import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import Navbar from './Navbar'
import SearchBar from '../../../../apps/web/src/features/search/SearchBar/SearchBar'

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    viewport: {
      options: INITIAL_VIEWPORTS,
    },
  },
  render: function Render(args) {
    const [searchInput, setSearchInput] = useState('')
    return (
      <Navbar
        {...args}
        searchSlot={<SearchBar value={searchInput} onChange={setSearchInput} />}
      />
    )
  },
}

export default meta

type Story = StoryObj<typeof Navbar>

export const Desktop: Story = {
  globals: {
    viewport: { value: 'ipad', isRotated: false },
  },
}

export const Mobile: Story = {
  globals: {
    viewport: { value: 'iphonex', isRotated: false },
  },
}

export const Interactive: Story = {}