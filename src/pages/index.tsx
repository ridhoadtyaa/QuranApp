import LastReadCard from '@/components/mollecules/LastReadCard'
import SearchBar from '@/components/mollecules/SearchBar'
import Surah from '@/components/mollecules/Surah'
import Layout from '@/components/templates/Layout'

import { getMetaData, twclsx } from '@/libs'
import * as atom from '@/stores'

import { useAtom } from 'jotai'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { Surat, SuratListItem } from 'quran-app'
import { useMemo } from 'react'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '')

interface HomePageProps {
  surat: SuratListItem[]
}

const Home: NextPage<HomePageProps> = ({ surat }) => {
  const [search] = useAtom(atom.search)

  const filteredSurat = useMemo(
    () => surat.filter((s) => s.namaLatin.toLocaleLowerCase().includes(search.toLowerCase())),
    [surat, search]
  )

  const meta = getMetaData({
    title: 'Baca Al-Quran Online',
    description: `Baca Al-Quran online lengkap 114 surah — teks Arab, latin, terjemahan Indonesia, tafsir, dan audio murottal. Gratis dan bisa diakses offline.`,
    og_image: `https://ik.imagekit.io/qmw3y9jqe/photo_2022-07-03_22-00-25_uVwQUQP0f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656860463001`,
    og_image_alt: 'Quran App',
    slug: '/',
    type: 'website'
  })

  return (
    <Layout {...meta}>
      <Head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Quran App',
              url: SITE_URL,
              inLanguage: 'id',
              description:
                'Baca Al-Quran online lengkap 114 surah — teks Arab, latin, terjemahan Indonesia, tafsir, dan audio murottal.'
            })
          }}
        />
      </Head>
      <h1 className={twclsx('text-xl font-bold md:text-2xl', 'text-primary-900')}>Daftar Surah</h1>

      <SearchBar />

      <LastReadCard />

      <section
        className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80', 'mb-6')}
      >
        {filteredSurat.length ? (
          filteredSurat.map((s) => <Surah key={s.nomor} {...s} />)
        ) : (
          <p className={twclsx('text-center', 'pt-3')}>Surah yang anda cari tidak ditemukan.</p>
        )}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const req = await fetch('https://equran.id/api/v2/surat')
  const surat: Surat = await req.json()

  return {
    props: {
      // Hanya field yang dipakai kartu Surah — deskripsi & audioFull dibuang (±120 KB → ±15 KB)
      surat: surat.data.map(({ nomor, nama, namaLatin, jumlahAyat, tempatTurun }) => ({
        nomor,
        nama,
        namaLatin,
        jumlahAyat,
        tempatTurun
      }))
    }
  }
}

export default Home
