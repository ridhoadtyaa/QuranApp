import * as atoms from '@/stores'

import { useAtom } from 'jotai'
import { useEffect } from 'react'

const useTheme = () => {
  const [theme, setTheme] = useAtom(atoms.theme)

  const toggleTheme = () => setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'))

  useEffect(() => {
    document.documentElement.className = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  return {
    theme,
    toggleTheme
  }
}

export default useTheme
