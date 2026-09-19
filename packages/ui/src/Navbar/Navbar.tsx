import { AppBar, Toolbar, Box } from '@mui/material'
import { useColorScheme } from '@mui/material/styles'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import Logo from '../Logo/Logo'
import styles from './Navbar.module.css'

interface NavbarProps {
  searchSlot?: ReactNode
  onLogoClick?: () => void
}

function Navbar({ searchSlot, onLogoClick }: NavbarProps) {
  const { mode, systemMode, setMode } = useColorScheme()
  const effectiveMode = mode === 'system' ? systemMode : mode
  const isDark = effectiveMode === 'dark'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setMode(isDark ? 'light' : 'dark')
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
    >
      <Toolbar className={styles.toolbar}>
        <Logo onClick={onLogoClick} />
        <div className={styles.searchWrapper}>{searchSlot}</div>
        <Box sx={{ flexShrink: 0 }}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label="toggle dark/light theme"
          >
            <motion.div
              className={styles.themeToggleThumb}
              animate={{ x: isDark ? '1.5rem' : '0.15rem' }}
              transition={{ type: 'spring', stiffness: 500, damping: 32 }}
            >
              {isDark ? (
                <DarkModeOutlinedIcon sx={{ fontSize: '0.9rem' }} />
              ) : (
                <LightModeOutlinedIcon sx={{ fontSize: '0.9rem' }} />
              )}
            </motion.div>
          </button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar