import Layout, { LayoutProps } from '@/components/templates/Layout'

import { twclsx } from '@/libs'
import { getMetaData } from '@/libs/metaData'

import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Surat } from 'quran-app'

interface HomePageProps {
  surat: Array<Surat>
}

const Home: NextPage<HomePageProps> = ({ surat }) => {
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
        <h3 className={twclsx('text-primary-900')}>Daftar Surah</h3>

        <div className={twclsx('divide-y-2', 'my-6')}>
          {surat.map((s) => (
            <Link href={`/surat/${s.nomor}`} key={s.nomor}>
              <div
                className={twclsx('flex justify-between items-center', 'py-4', 'cursor-pointer')}
                key={s.nomor}
              >
                <div className={twclsx('flex items-center', 'space-x-5')}>
                  <div className={twclsx('star8')}>
                    <div className={twclsx('-rotate-45', 'z-10', 'font-medium', 'text-sm')}>
                      {s.nomor}
                    </div>
                  </div>
                  <div className={twclsx('space-y-2')}>
                    <div className={twclsx('font-semibold', 'text-lg')}>{s.nama_latin}</div>
                    <p
                      className={twclsx(
                        'text-slate-400 text-xs dark:text-slate-500',
                        'font-semibold',
                        'uppercase'
                      )}
                    >
                      {s.tempat_turun} &bull; {s.jumlah_ayat} AYAT
                    </p>
                  </div>
                </div>
                <div className={twclsx('font-bold', 'text-primary-600 text-xl')}>{s.nama}</div>
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const req = await fetch('https://equran.id/api/surat')
  const surat = await req.json()

  return {
    props: {
      surat
    }
  }
}

export default Home
