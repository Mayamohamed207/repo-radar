import { AppBar, Toolbar } from '@mui/material'
import Logo from '../Logo/Logo'
import SearchBar from '../../features/search/SearchBar/SearchBar'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <AppBar position="sticky" color="transparent" elevation={0} className={styles.navbar}>
      <Toolbar className={styles.toolbar}>
        <Logo />
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar