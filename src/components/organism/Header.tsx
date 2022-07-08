import UnstyledLink from '@/components/atoms/UnstyledLink'
import ToggleDarkMode from '@/components/mollecules/ToggleDarkMode'

import useWindowScroll from '@/hooks/useWindowScroll'
import { twclsx } from '@/libs'

const Header: React.FunctionComponent = () => {
  const scrollPos = useWindowScroll()

  return (
    <header
      className={twclsx(
        'fixed top-0 z-50',
        'w-full',
        'border-b',
        'bg-white dark:bg-[#001140]',
        scrollPos > 68 ? 'border-primary-300 dark:border-primary-700' : 'border-transparent'
      )}
    >
      <nav>
        <div className={twclsx('layout', 'py-5', 'flex justify-between items-center')}>
          <UnstyledLink href='/'>
            <h2 className={twclsx('text-primary-700 dark:text-white')}>Quran App</h2>
          </UnstyledLink>
          <div>
            <ToggleDarkMode />
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
