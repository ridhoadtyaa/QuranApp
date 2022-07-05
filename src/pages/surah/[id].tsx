import Layout, { LayoutProps } from '@/components/templates/Layout'

import { getMetaData } from '@/libs'

import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SuratDetail } from 'quran-app'
import { useQuery } from 'react-query'

const SurahPage: NextPage = () => {
  const router = useRouter()
  const surahId = router.query.id

  const { data, isLoading, isError } = useQuery<SuratDetail>(['surah', surahId], async () => {
    const res = await fetch(`https://equran.id/api/surat/${surahId}`)
    return res.json()
  })

  const meta = getMetaData({
    title: `Quran App`,
    template: data?.nama_latin,
    description: `Membaca Al-Quran dengan mudah dimanapun dan kapanpun.`,
    keywords: ['Quran App', 'Al-Quran', 'Al-Quran Online', 'Baca Al-Quran', `${data?.nama_latin}`],
    og_image: `https://ik.imagekit.io/qmw3y9jqe/photo_2022-07-03_22-00-25_uVwQUQP0f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656860463001`,
    og_image_alt: 'Quran App',
    slug: `/surah/${data?.nomor}`,
    type: 'website'
  })

  return (
    <Layout {...(meta as LayoutProps)}>
      {isLoading ? <h1>Loading</h1> : isError ? <h1>Error</h1> : <h1>{data?.nama}</h1>}
    </Layout>
  )
}

export default SurahPage
