import Layout, { LayoutProps } from '@/components/templates/Layout'

import { getMetaData } from '@/libs/metaData'

import type { NextPage } from 'next'

const Home: NextPage = () => {
  const meta = getMetaData({
    title: 'Quran App',
    template: 'Home',
    description: `Membaca Al-Quran dengan mudah dimanapun dan kapanpun.`,
    keywords: ['Quran App', 'Al-Quran', 'Al-Quran Online', 'Baca Al-Quran'],
    og_image: `https://ik.imagekit.io/qmw3y9jqe/photo_2022-07-03_22-00-25_uVwQUQP0f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656860463001`,
    og_image_alt: 'Quran App',
    slug: '/',
    type: 'website'
  })

  return (
    <>
      <Layout {...(meta as LayoutProps)}>
        <h2>test</h2>
      </Layout>
    </>
  )
}

export default Home
