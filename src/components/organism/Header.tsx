import ToggleDarkMode from '@/components/mollecules/ToggleDarkMode'

import { twclsx } from '@/libs'

const Header: React.FunctionComponent = () => {
  return (
    <header>
      <nav className={twclsx('layout', 'py-5', 'flex justify-between items-center')}>
        <h3 className={twclsx('text-primary-700')}>Quran App</h3>
        <div>
          <ToggleDarkMode />
        </div>
      </nav>
    </header>
  )
}

export default Header
