import UnstyledLink from '@/components/atoms/UnstyledLink'
import Ayat from '@/components/mollecules/Ayat'
import SurahInfo from '@/components/mollecules/SurahInfo'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { getMetaData, twclsx } from '@/libs'

import axios from 'axios'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { Ayat as AyatType, Surat, SuratDetail, Tafsir } from 'quran-app'
import { memo } from 'react'
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrowRight } from 'react-icons/bs'
import { IoIosArrowRoundBack as Back } from 'react-icons/io'

interface SurahPageProps {
  surah: SuratDetail
  tafsir: Tafsir[]
}

interface IParams extends ParsedUrlQuery {
  id: string
}

const SurahPage: NextPage<SurahPageProps> = ({ surah, tafsir }) => {
  const meta = getMetaData({
    title: `Quran App`,
    template: surah.nama_latin,
    description: `Membaca Al-Quran dengan mudah dimanapun dan kapanpun.`,
    keywords: ['Quran App', 'Al-Quran', 'Al-Quran Online', 'Baca Al-Quran', `${surah.nama_latin}`],
    og_image: `https://ik.imagekit.io/qmw3y9jqe/photo_2022-07-03_22-00-25_uVwQUQP0f.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1656860463001`,
    og_image_alt: 'Quran App',
    slug: `/surah/${surah.nomor}`,
    type: 'website'
  })

  return (
    <Layout {...(meta as LayoutProps)}>
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
      <SurahInfo
        nama_latin={surah.nama_latin}
        arti={surah.arti}
        jumlah_ayat={surah.jumlah_ayat}
        tempat_turun={surah.tempat_turun}
        deskripsi={surah.deskripsi}
      />
      <audio src={surah.audio} controls className={twclsx('mt-7', 'w-full')}></audio>

      <section className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80')}>
        {surah.ayat.map((a: AyatType, i: number) => (
          <Ayat ayat={a} surah={surah.nama_latin} key={a.id} tafsir={tafsir[i]} />
        ))}
      </section>

      <section className={twclsx('flex items-center justify-between', 'my-3')}>
        {surah.surat_sebelumnya && (
          <UnstyledLink
            title='Surat Sebelumnya'
            href={`/surah/${surah.surat_sebelumnya.nomor}`}
            className={twclsx('next-before-button')}
          >
            <ArrowLeft className={twclsx('mr-2')} />
            <span>{surah.surat_sebelumnya.nama_latin}</span>
          </UnstyledLink>
        )}
        {surah.surat_selanjutnya && (
          <UnstyledLink
            title='Surat Selanjutnya'
            href={`/surah/${surah.surat_selanjutnya.nomor}`}
            className={twclsx('next-before-button', 'ml-auto')}
          >
            <span>{surah.surat_selanjutnya.nama_latin}</span>
            <ArrowRight className={twclsx('ml-2')} />
          </UnstyledLink>
        )}
      </section>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get<Surat[]>('https://equran.id/api/surat')
  const paths = data.map((surah: Surat) => {
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
  const { data: surah } = await axios.get<SuratDetail>(`https://equran.id/api/surat/${id}`)
  const { data: tafsir } = await axios.get<Tafsir>(`https://equran.id/api/tafsir/${id}`)

  return {
    props: {
      surah,
      tafsir: tafsir.tafsir
    }
  }
}

export default memo(SurahPage)
