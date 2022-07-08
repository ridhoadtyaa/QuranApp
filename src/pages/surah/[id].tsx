import UnstyledLink from '@/components/atoms/UnstyledLink'
import Ayat from '@/components/mollecules/Ayat'
import SurahInfo from '@/components/mollecules/SurahInfo'
import Layout, { LayoutProps } from '@/components/templates/Layout'

import { getMetaData, twclsx } from '@/libs'

import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SuratDetail } from 'quran-app'
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrowRight } from 'react-icons/bs'
import { IoIosArrowRoundBack as Back } from 'react-icons/io'
import { useQuery } from 'react-query'

const SurahPage: NextPage = () => {
  const router = useRouter()
  const surahId = router.query.id

  const { data, isLoading, isError } = useQuery<SuratDetail>(['surah', surahId], async () => {
    const res = await axios.get(`https://equran.id/api/surat/${surahId}`)
    return res.data
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
      {isLoading ? (
        <h3 className={twclsx('text-center')}>Loading...</h3>
      ) : isError ? (
        <h3 className={twclsx('text-center')}>Error</h3>
      ) : (
        <>
          <UnstyledLink
            className={twclsx(
              'text-primary-800 dark:text-primary-400 font-medium',
              'mb-3',
              'flex items-center'
            )}
            href='/'
          >
            <Back size={30} />
            Kembali
          </UnstyledLink>
          <SurahInfo
            nama_latin={data?.nama_latin}
            arti={data?.arti}
            jumlah_ayat={data?.jumlah_ayat}
            tempat_turun={data?.tempat_turun}
            deskripsi={data?.deskripsi}
          />
          <audio src={data?.audio} controls className={twclsx('mt-7', 'w-full')}></audio>
          <section
            className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80')}
          >
            {data?.ayat.map((a) => (
              <Ayat ayat={a} key={a.id} />
            ))}
          </section>

          <section className={twclsx('flex items-center justify-between', 'my-3')}>
            {data?.surat_sebelumnya && (
              <UnstyledLink
                title='Surat Sebelumnya'
                href={`/surah/${data.surat_sebelumnya.nomor}`}
                className={twclsx(
                  'bg-primary-600 hover:ring hover:ring-primary-300 transition',
                  'text-white text-sm',
                  'py-2 px-3',
                  'rounded-md',
                  'flex items-center',
                  'mr-auto'
                )}
              >
                <ArrowLeft className={twclsx('mr-2')} />
                <span>{data?.surat_sebelumnya.nama_latin}</span>
              </UnstyledLink>
            )}
            {data?.surat_selanjutnya && (
              <UnstyledLink
                title='Surat Selanjutnya'
                href={`/surah/${data.surat_selanjutnya.nomor}`}
                className={twclsx(
                  'bg-primary-600 hover:ring hover:ring-primary-300 transition',
                  'text-white text-sm',
                  'py-2 px-3',
                  'rounded-md',
                  'flex items-center',
                  'ml-auto'
                )}
              >
                <span>{data?.surat_selanjutnya.nama_latin}</span>
                <ArrowRight className={twclsx('ml-2')} />
              </UnstyledLink>
            )}
          </section>
        </>
      )}
    </Layout>
  )
}

export default SurahPage
