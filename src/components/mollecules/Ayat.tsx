import { twclsx } from "@/libs"
import Button from "../atoms/Button"

import { AiOutlineRead as Read, AiOutlineShareAlt as Share } from 'react-icons/ai'
import { Ayat } from "quran-app"
import { memo, useState } from "react"
import Modal from "./Modal"

interface AyatProps {
  ayat: Ayat,
  surah: string,
  tafsir: {
    ayat: number,
    teks: string,
  }
  nomor: number
}

const Ayat: React.FunctionComponent<AyatProps> = ({ayat, surah, tafsir, nomor}) => {
  const [modalTafsir, setModalTafsir] = useState(false)

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share({
            title: surah,
            text: `Baca Surah ${surah} ayat ${ayat.nomorAyat} di Quran App`,
            url: `https://quran-app-ran.vercel.app/surah/${nomor}#${ayat.nomorAyat}`
          })
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`)
      }
    } else {
      console.log(
        'Web share is currently not supported on this browser.'
      )
    }
  }

  return (
    <>
      <div id={ayat.nomorAyat.toString()} className={twclsx('py-8')}>
        <div
          className={twclsx(
            'flex justify-between items-center',
            'bg-gray-100/90 rounded-lg dark:bg-[#101D4D]',
            'py-2 px-4'
          )}
        >
          <div
            className={twclsx(
              'bg-primary-700 rounded-full dark:bg-primary-500',
              'text-white text-center text-sm leading-7',
              'w-7 h-7',
            )}
          >
            {ayat.nomorAyat}
          </div>
          <div className={twclsx('flex items-center', 'space-x-4')}>
            <Button onClick={handleSharing}>
              <Share size={22} className={twclsx('fill-primary-700 dark:fill-primary-400')} title='Bagikan' />
              <span className={twclsx('sr-only')}>Tombol Bagikan</span>
            </Button>
            <Button onClick={() => setModalTafsir(true)}>
              <Read size={24} className={twclsx('fill-primary-700 dark:fill-primary-400')} title='Lihat Tafsir' />
              <span className={twclsx('sr-only')}>Tombol Lihat Tafsir</span>
            </Button>
          </div>
        </div>
        <div className={twclsx('mt-6', 'px-4')}>
          <div className={twclsx('text-right text-3xl leading-[2.4]', 'font-arabic', 'mt-6')}>{ayat.teksArab}</div>
          <div className={twclsx('mt-8 mb-4')} dangerouslySetInnerHTML={{ __html: `<p>${ayat.teksLatin}</p>` }} />
          <p className={twclsx('text-sm', 'text-slate-600 dark:text-slate-400')}>{ayat.teksIndonesia}</p>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={modalTafsir} closeModal={() => setModalTafsir(false)} title={`Tafsir Ayat ${tafsir.ayat} Surah ${surah}`}>
        <p className={twclsx('whitespace-pre-wrap', 'mt-6', 'text-sm xl:text-base')}>{tafsir.teks}</p>
      </Modal>
    </>
  )
}

export default memo(Ayat)