import SearchBar from '@/components/mollecules/SearchBar'
import Surah from '@/components/mollecules/Surah'
import Layout from '@/components/templates/Layout'

import { getMetaData, twclsx } from '@/libs'
import * as atom from '@/stores'

import { useAtom } from 'jotai'
import type { GetStaticProps, NextPage } from 'next'
import { SuratData } from 'quran-app'

interface HomePageProps {
  surat: SuratData[]
}

const Home: NextPage<HomePageProps> = ({ surat }) => {
  const [search] = useAtom(atom.search)

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
    <Layout {...meta}>
      <h3 className={twclsx('text-primary-900')}>Daftar Surah</h3>

      <SearchBar />

      <section
        className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80', 'mb-6')}
      >
        {surat.filter((s) => s.namaLatin.toLocaleLowerCase().includes(search.toLowerCase()))
          .length ? (
          surat
            .filter((s) => s.namaLatin.toLocaleLowerCase().includes(search.toLowerCase()))
            .map((s) => <Surah key={s.nomor} {...s} />)
        ) : (
          <p className={twclsx('text-center', 'pt-3')}>Surah yang anda cari tidak ditemukan.</p>
        )}
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const req = await fetch('https://equran.id/api/v2/surat')
  const surat = await req.json()

  return {
    props: {
      surat: surat.data
    }
  }
}

export default Home
