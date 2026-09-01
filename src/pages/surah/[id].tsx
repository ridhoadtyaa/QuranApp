import UnstyledLink from '@/components/atoms/UnstyledLink'
import SurahDetail from '@/components/organism/SurahDetail'
import Layout from '@/components/templates/Layout'

import { getMetaData, twclsx } from '@/libs'

import { BreadcrumbJsonLd } from 'next-seo'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Surat, SuratData, SuratDetail } from 'quran-app'
import { IoIosArrowRoundBack as Back } from 'react-icons/io'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '')

interface SurahPageProps {
  surah: SuratDetail
}

interface IParams extends ParsedUrlQuery {
  id: string
}

const SurahPage: NextPage<SurahPageProps> = ({ surah }) => {
  const { nomor, namaLatin, arti, jumlahAyat, tempatTurun } = surah.data
  const tempat = tempatTurun.charAt(0).toUpperCase() + tempatTurun.slice(1)

  const meta = getMetaData({
    title: `Surah ${namaLatin}`,
    description: `Baca Surah ${namaLatin} (${arti}) — ${jumlahAyat} ayat, diturunkan di ${tempat}. Teks Arab, latin, terjemahan Indonesia, tafsir, dan audio murottal.`,
    og_image: `https://ik.imagekit.io/qmw3y9jqe/photo_2022-07-03_22-00-25_uVwQUQP0f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656860463001`,
    og_image_alt: 'Quran App',
    slug: `/surah/${nomor}`,
    type: 'website'
  })

  return (
    <Layout {...meta}>
      <BreadcrumbJsonLd
        itemListElements={[
          { position: 1, name: 'Beranda', item: SITE_URL },
          { position: 2, name: `Surah ${namaLatin}`, item: `${SITE_URL}/surah/${nomor}` }
        ]}
      />
      <UnstyledLink
        className={twclsx(
          'text-primary-800 dark:text-primary-400 font-medium',
          'mb-3',
          'inline-flex items-center'
        )}
        href='/'
      >
        <Back size={30} />
        Kembali
      </UnstyledLink>
      {/* key memaksa remount saat pindah surah agar visibleCount, cache tafsir, dan scroll ikut reset */}
      <SurahDetail key={surah.data.nomor} surah={surah} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const req = await fetch('https://equran.id/api/v2/surat')
  const { data }: Surat = await req.json()
  const paths = data.map((surah: SuratData) => {
    return {
      params: { id: surah.nomor.toString() }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as IParams
  const req = await fetch(`https://equran.id/api/v2/surat/${id}`)
  const data: SuratDetail = await req.json()

  // Pangkas field yang tidak dipakai UI: audio per-ayat (6 qari, ±500 char/ayat)
  // dan audioFull selain qari '01' — memotong payload Al-Baqarah ±140 KB
  const surah: SuratDetail = {
    data: {
      ...data.data,
      audioFull: { '01': data.data.audioFull['01'] },
      ayat: data.data.ayat.map(({ nomorAyat, teksArab, teksLatin, teksIndonesia }) => ({
        nomorAyat,
        teksArab,
        teksLatin,
        teksIndonesia
      }))
    }
  }

  return {
    props: {
      surah
    }
  }
}

export default SurahPage
