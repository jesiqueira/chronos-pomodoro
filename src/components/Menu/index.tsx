import React from 'react'
import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react'
import styles from './styles.module.css'

type AvaiLableThemes = 'dark' | 'light'

export function Menu() {
  const [thema, setThema] = React.useState<AvaiLableThemes>(() => (localStorage.getItem('theme') as AvaiLableThemes) || 'dark')

  function handleThemeChange(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault()
    setThema((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', thema)
    localStorage.setItem('theme', thema)
  }, [thema])

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }

  return (
    <nav className={styles.menu}>
      <a href="#" className={styles.menuLink} aria-label="Ir para Home" title="Ir para Home">
        <HouseIcon />
      </a>
      <a href="#" className={styles.menuLink} aria-label="Ver Histórico" title="Ver Histórico">
        <HistoryIcon />
      </a>
      <a href="#" className={styles.menuLink} aria-label="Configurações" title="Configurações">
        <SettingsIcon />
      </a>
      <a href="#" className={styles.menuLink} aria-label="Mudar Tema" title="Mudar Tema" onClick={handleThemeChange}>
        {nextThemeIcon[thema]}
      </a>
    </nav>
  )
}
