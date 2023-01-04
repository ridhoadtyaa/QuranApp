import '@/styles/globals.css'

import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import Router from 'next/router'
import NProgress from 'nprogress'
import { useEffect } from 'react'

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
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
