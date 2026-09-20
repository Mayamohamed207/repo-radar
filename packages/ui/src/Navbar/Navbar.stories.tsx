import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextField } from '@mui/material'
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
  render: function Render(args) {
    const [searchInput, setSearchInput] = useState('')
    return (
      <Navbar
        {...args}
        searchSlot={
          <TextField
            fullWidth
            size="small"
            placeholder="Search GitHub repositories..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            sx={{ maxWidth: '32rem' }}
          />
        }
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