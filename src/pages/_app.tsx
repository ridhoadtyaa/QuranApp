import '@/styles/globals.css'

import { Poppins } from '@next/font/google'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'

// display 'optional': di koneksi lambat teks langsung dirender dengan fallback
// yang metrik-nya disesuaikan next/font, tanpa repaint saat font tiba —
// repaint swap itu yang membuat LCP molor di mobile
const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'optional'
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => {
      NProgress.start()
    })

    Router.events.on('routeChangeComplete', () => {
      NProgress.done(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Router])

  return (
    <ThemeProvider attribute='class' storageKey='theme' enableSystem>
      {/* Var di :root agar font juga berlaku untuk modal Headless UI yang dirender lewat portal */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        :root {
          --font-poppins: ${poppins.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
