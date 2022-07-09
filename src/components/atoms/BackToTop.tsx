import useWindowScroll from '@/hooks/useWindowScroll'
import { twclsx } from '@/libs'

import Button from './Button'

import { AiOutlineArrowUp } from 'react-icons/ai'

const BackToTop: React.FunctionComponent = () => {
  const yAxis = useWindowScroll()
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return yAxis > 200 ? (
    <Button
      title='Kembali ke atas'
      onClick={handleClick}
      className={twclsx(
        'fixed md:bottom-[12vh] lg:right-[8vw]',
        'bottom-[6vh] right-[6vw]',
        'h-10 w-10 z-[1]',
        'rounded-xl md:text-lg',
        'text-primary-700 dark:text-primary-300',
        'bg-primary-200 dark:bg-primary-800',
        'hover:ring ring-primary-300 dark:ring-primary-700'
      )}
    >
      <AiOutlineArrowUp />
      <span className={twclsx('sr-only')}>Back To Top</span>
    </Button>
  ) : null
}

export default BackToTop
