import Seo, { CustomSeoProps } from '@/components/atoms/Seo'
import Header from '@/components/organism/Header'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

export interface LayoutProps extends CustomSeoProps {
  children: JSX.Element
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <Header />
      <main className={twclsx('mt-10 scroll-mt-10', 'layout')}>{children}</main>
    </>
  )
}

export default Layout
