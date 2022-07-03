import Button from '@/components/atoms/Button'

import useTheme from '@/hooks/useTheme'
import { twclsx } from '@/libs'

import { HiMoon, HiSun } from 'react-icons/hi'

const ToggleDarkMode: React.FunctionComponent = () => {
  const { theme, toggleTheme } = useTheme()

  const BUTTON_TTLE = `Ubah tema mode ${theme === 'light' ? 'gelap' : 'terang'}`

  return (
    <Button
      title={BUTTON_TTLE}
      onClick={toggleTheme}
      className={twclsx(
        'p-2',
        'bg-primary-200 dark:bg-primary-900',
        'rounded-md',
        'hover:ring hover:ring-primary-300 dark:hover:ring-primary-800',
        'transition duration-200'
      )}
    >
      <span className='sr-only'>Ubah Tema</span>
      {theme === 'light' ? (
        <HiMoon className={twclsx('text-primary-800')} size={18} />
      ) : (
        <HiSun className={twclsx('text-yellow-400')} size={18} />
      )}
    </Button>
  )
}

export default ToggleDarkMode
