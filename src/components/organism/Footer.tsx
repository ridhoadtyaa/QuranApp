import UnstyledLink from '@/components/atoms/UnstyledLink'

import { twclsx } from '@/libs'

const Footer: React.FunctionComponent = () => {
  return (
    <footer className={twclsx('layout', 'py-4', 'text-center')}>
      <p>
        &copy; Copyright 2022 &bull; Made with 💖 by{' '}
        <UnstyledLink
          title='Ridho Aditya Github'
          href='https://github.com/ridhoadtyaa'
          className={twclsx('text-primary-700 dark:text-primary-500')}
        >
          Ridho Aditya Nurtama
        </UnstyledLink>
      </p>
    </footer>
  )
}

export default Footer
