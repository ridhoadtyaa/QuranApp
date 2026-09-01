import BackToTop from '@/components/atoms/BackToTop'
import Seo, { CustomSeoProps } from '@/components/atoms/Seo'
import Footer from '@/components/organism/Footer'
import Header from '@/components/organism/Header'

import { twclsx } from '@/libs/twclsx'

import { NextPage } from 'next'

export type LayoutPageProps = {
  children?: React.ReactNode
  className?: string
}

const Layout: NextPage<LayoutPageProps> = ({ className, ...props }) => {
  return (
    <>
      <Seo {...(props as CustomSeoProps)} />
      <a
        href='#konten'
        className={twclsx(
          'sr-only',
          'focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]',
          'focus:rounded-md focus:bg-primary-600 focus:py-2 focus:px-4 focus:text-white'
        )}
      >
        Langsung ke konten
      </a>
      <Header />
      <main id='konten' className={twclsx('mt-28 scroll-mt-28', 'layout', 'relative', className)}>
        {props.children}
        <BackToTop />
      </main>
      <Footer />
    </>
  )
}

export default Layout
