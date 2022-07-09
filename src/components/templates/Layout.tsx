import BackToTop from '@/components/atoms/BackToTop'
import Seo, { CustomSeoProps } from '@/components/atoms/Seo'
import Footer from '@/components/organism/Footer'
import Header from '@/components/organism/Header'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

export interface LayoutProps extends CustomSeoProps {
  children: React.ReactNode
  className?: string
}

const Layout: NextPage<LayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <Seo {...props} />
      <Header />
      <main className={twclsx('mt-28 scroll-mt-28', 'layout', 'relative')}>
        {children}
        <BackToTop />
      </main>
      <Footer />
    </>
  )
}

export default Layout
