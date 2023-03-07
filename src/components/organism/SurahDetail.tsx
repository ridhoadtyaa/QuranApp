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
    tafsir: TafsirList
  }
}

const SurahDetail: React.FunctionComponent<SurahDetailProps> = ({ data: { surah, tafsir } }) => {
  const [data] = useState({ surah, tafsir })

  return (
    <>
      <SurahInfo
        nama_latin={data.surah.data.namaLatin}
        arti={data.surah.data.arti}
        jumlah_ayat={data.surah.data.jumlahAyat}
        tempat_turun={data.surah.data.tempatTurun}
        deskripsi={data.surah.data.deskripsi}
      />
      <audio
        src={data.surah.data.audioFull['01']}
        controls
        className={twclsx('mt-7', 'w-full')}
      ></audio>

      <section className={twclsx('divide-y-[1px] divide-slate-200/80 dark:divide-slate-700/80')}>
        {data.surah.data.ayat.map((a: AyatType, i: number) => (
          <Ayat
            ayat={a}
            nomor={data.surah.data.nomor}
            surah={data.surah.data.namaLatin}
            key={a.nomorAyat}
            tafsir={data.tafsir.tafsir[i]}
          />
        ))}
      </section>

      <section className={twclsx('flex items-center justify-between', 'my-3')}>
        {data.surah.data.suratSebelumnya && (
          <UnstyledLink
            title='Surat Sebelumnya'
            href={`/surah/${data.surah.data.suratSebelumnya.nomor}`}
            className={twclsx('next-before-button')}
          >
            <ArrowLeft className={twclsx('mr-2')} />
            <span>{data.surah.data.suratSebelumnya.namaLatin}</span>
          </UnstyledLink>
        )}
        {data.surah.data.suratSelanjutnya && (
          <UnstyledLink
            title='Surat Selanjutnya'
            href={`/surah/${data.surah.data.suratSelanjutnya.nomor}`}
            className={twclsx('next-before-button', 'ml-auto')}
          >
            <span>{data.surah.data.suratSelanjutnya.namaLatin}</span>
            <ArrowRight className={twclsx('ml-2')} />
          </UnstyledLink>
        )}
      </section>
    </>
  )
}

export default memo(SurahDetail)
