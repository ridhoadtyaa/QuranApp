import UnstyledLink from '@/components/atoms/UnstyledLink'
import SurahDetail from '@/components/organism/SurahDetail'
import Layout from '@/components/templates/Layout'

import { getMetaData, twclsx } from '@/libs'

import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Surat, SuratData, SuratDetail, Tafsir, TafsirList } from 'quran-app'
import { useState } from 'react'
import { IoIosArrowRoundBack as Back } from 'react-icons/io'

interface SurahPageProps {
  surah: SuratDetail
  tafsir: TafsirList
}

interface IParams extends ParsedUrlQuery {
  id: string
}

const SurahPage: NextPage<SurahPageProps> = ({ surah, tafsir }) => {
  const [data] = useState({ surah, tafsir }) // rerender object solve

  const meta = getMetaData({
    title: `Quran App`,
    template: data.surah.data.namaLatin,
    description: `Membaca Al-Quran dengan mudah dimanapun dan kapanpun.`,
    keywords: [
      'Quran App',
      'Al-Quran',
      'Al-Quran Online',
      'Baca Al-Quran',
      `${data.surah.data.namaLatin}`
    ],
    og_image: `https://ik.imagekit.io/qmw3y9jqe/photo_2022-07-03_22-00-25_uVwQUQP0f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656860463001`,
    og_image_alt: 'Quran App',
    slug: `/surah/${data.surah.data.nomor}`,
    type: 'website'
  })

  return (
    <Layout {...meta}>
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
      <SurahDetail data={data} />
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    data: { data }
  } = await axios.get<Surat>('https://equran.id/api/v2/surat')
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
  const { data: surah } = await axios.get<SuratDetail>(`https://equran.id/api/v2/surat/${id}`)
  const {
    data: { data: tafsir }
  } = await axios.get<Tafsir>(`https://equran.id/api/v2/tafsir/${id}`)

  return {
    props: {
      surah,
      tafsir
    }
  }
}

export default SurahPage
