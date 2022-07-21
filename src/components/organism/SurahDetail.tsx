import Ayat from '@/components/mollecules/Ayat'
import SurahInfo from '@/components/mollecules/SurahInfo'

import { twclsx } from '@/libs'

import UnstyledLink from '../atoms/UnstyledLink'

import { Ayat as AyatType, SuratDetail, TafsirList } from 'quran-app'
import { memo, useState } from 'react'
import { BsArrowLeft as ArrowLeft, BsArrowRight as ArrowRight } from 'react-icons/bs'

interface SurahDetailProps {
  data: {
    surah: SuratDetail
    tafsir: TafsirList[]
  }
}

const SurahDetail: React.FunctionComponent<SurahDetailProps> = ({ data: { surah, tafsir } }) => {
  const [data] = useState({ surah, tafsir })

  return (
    <>
      <SurahInfo
        nama_latin={data.surah.nama_latin}
        arti={data.surah.arti}
        jumlah_ayat={data.surah.jumlah_ayat}
        tempat_turun={data.surah.tempat_turun}
        deskripsi={data.surah.deskripsi}
      />
      <audio src={data.surah.audio} controls className={twclsx('mt-7', 'w-full')}></audio>

      <section className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80')}>
        {data.surah.ayat.map((a: AyatType, i: number) => (
          <Ayat ayat={a} surah={data.surah.nama_latin} key={a.id} tafsir={data.tafsir[i]} />
        ))}
      </section>

      <section className={twclsx('flex items-center justify-between', 'my-3')}>
        {data.surah.surat_sebelumnya && (
          <UnstyledLink
            title='Surat Sebelumnya'
            href={`/surah/${data.surah.surat_sebelumnya.nomor}`}
            className={twclsx('next-before-button')}
          >
            <ArrowLeft className={twclsx('mr-2')} />
            <span>{data.surah.surat_sebelumnya.nama_latin}</span>
          </UnstyledLink>
        )}
        {data.surah.surat_selanjutnya && (
          <UnstyledLink
            title='Surat Selanjutnya'
            href={`/surah/${data.surah.surat_selanjutnya.nomor}`}
            className={twclsx('next-before-button', 'ml-auto')}
          >
            <span>{data.surah.surat_selanjutnya.nama_latin}</span>
            <ArrowRight className={twclsx('ml-2')} />
          </UnstyledLink>
        )}
      </section>
    </>
  )
}

export default memo(SurahDetail)
