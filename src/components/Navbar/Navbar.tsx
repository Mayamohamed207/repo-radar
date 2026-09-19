import { AppBar, Toolbar, IconButton, Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import Logo from '../Logo/Logo'
import SearchBar from '../../features/search/SearchBar/SearchBar'
import styles from './Navbar.module.css'

interface NavbarProps {
  searchInput: string
  onSearchChange: (value: string) => void
}

function Navbar({ searchInput, onSearchChange }: NavbarProps) {
  const { mode, systemMode, setMode } = useColorScheme()
  const effectiveMode = mode === 'system' ? systemMode : mode
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setMode(effectiveMode === 'dark' ? 'light' : 'dark')
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <Toolbar className={styles.toolbar}>
        <Logo />
        <div className={styles.searchWrapper}>
          <SearchBar value={searchInput} onChange={onSearchChange} />
        </div>
        <Box sx={{ flexShrink: 0 }}>
          <IconButton
            onClick={toggleTheme}
            sx={{ color: 'var(--color-text-primary)' }}
            aria-label="toggle dark/light theme"
          >
            {effectiveMode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar